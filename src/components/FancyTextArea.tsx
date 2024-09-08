import React, { useRef, useEffect, useCallback } from 'react';
import { Box, FormControl, IconButton } from '@mui/joy';
import { MdFormatBold, MdOutlineFormatItalic, MdOutlineFormatListBulleted, MdOutlineFormatListNumbered, MdFormatIndentIncrease, MdFormatIndentDecrease } from "react-icons/md";

interface FancyTextAreaProps {
  onChange: (html: string) => void;
  errors: any;
  register: any;
  instruction: string;
}

const useCursor = (ref: React.RefObject<HTMLElement>) => {
  const save = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(ref.current!);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      return preSelectionRange.toString().length;
    }
    return 0;
  }, [ref]);

  const restore = useCallback((cursorPosition: number) => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(ref.current!);
    const textNodes = getTextNodesIn(ref.current!);
    let charCount = 0, end = 0;

    for (let i = 0; i < textNodes.length; i++) {
      end = charCount + textNodes[i].length;
      if (cursorPosition >= charCount && cursorPosition <= end) {
        range.setStart(textNodes[i], cursorPosition - charCount);
        range.setEnd(textNodes[i], cursorPosition - charCount);
        break;
      }
      charCount = end;
    }

    selection?.removeAllRanges();
    selection?.addRange(range);
  }, [ref]);

  return { save, restore };
};

function getTextNodesIn(node: Node): Text[] {
  const textNodes: Text[] = [];
  if (node.nodeType === Node.TEXT_NODE) {
    textNodes.push(node as Text);
  } else {
    const children = node.childNodes;
    for (let i = 0; i < children.length; i++) {
      textNodes.push(...getTextNodesIn(children[i]));
    }
  }
  return textNodes;
}

export default function FancyTextArea({ onChange, errors, register, instruction }: FancyTextAreaProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const { save, restore } = useCursor(editorRef);
  const contentRef = useRef(instruction);

  const errorStyle = "text-[.8rem] text-red-400";

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== instruction) {
      editorRef.current.innerHTML = instruction;
      contentRef.current = instruction;
      editorRef.current.focus();
    }
  }, [instruction]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      if (newContent !== contentRef.current) {
        contentRef.current = newContent;
        onChange(newContent);
      }
    }
    renumberLists();
  }, [onChange]);

  const insertListAtCursor = useCallback((listType: 'ul' | 'ol') => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const listElement = document.createElement(listType);
      const listItem = document.createElement('li');
      listElement.className = listType === 'ul' ? "list-disc px-7" : "list-decimal px-7";
      listItem.appendChild(document.createTextNode('\u00A0'));
      listElement.appendChild(listItem);
      range.insertNode(listElement);

      range.setStart(listItem, 0);
      range.setEnd(listItem, 0);
      selection.removeAllRanges();
      selection.addRange(range);

      editorRef.current?.focus();
      handleInput();
    }
  }, [handleInput]);

  const handleBulletPoints = useCallback(() => insertListAtCursor('ul'), [insertListAtCursor]);
  const handleNumberedList = useCallback(() => insertListAtCursor('ol'), [insertListAtCursor]);

  const applyStyle = useCallback((style: 'bold' | 'italic') => {
    document.execCommand(style, false, undefined);
    editorRef.current?.focus();
    handleInput();
  }, [handleInput]);
  
  const handleIndent = useCallback((increase: boolean) => {
    document.execCommand(increase ? 'indent' : 'outdent', false, undefined);
    handleInput();
  }, [handleInput]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const parentElement = range.startContainer.parentElement;
        
        if (parentElement && (parentElement.tagName === 'LI' || parentElement.parentElement?.tagName === 'LI')) {
          if (parentElement.textContent?.trim() === '') {
            e.preventDefault();
            document.execCommand('outdent', false, undefined);
            if (parentElement.parentElement?.childNodes.length === 1) {
              const p = document.createElement('p');
              p.innerHTML = '<br>';
              parentElement.parentElement.parentElement?.replaceChild(p, parentElement.parentElement);
              range.setStart(p, 0);
              range.setEnd(p, 0);
              selection.removeAllRanges();
              selection.addRange(range);
            }
            handleInput();
          }
        }
      }
    }
  }, [handleInput]);

  const renumberLists = useCallback(() => {
    if (editorRef.current) {
      const olElements = editorRef.current.querySelectorAll('ol');
      olElements.forEach((ol) => {
        let counter = 1;
        const lis = ol.querySelectorAll('li');
        lis.forEach((li) => {
          li.setAttribute('value', counter.toString());
          counter++;
        });
      });
    }
  }, []);

  return (
    <FormControl className="w-full border-b border-[#D1D5DB] mb-10">
      <p className="text-[1.2rem] font-semibold pt-2 mb-2">Instructions</p>
      <Box
        {...register('instructions')}
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className="rounded-xl border border-neutral-300 min-h-[130px] p-3 font-inherit text-inherit focus:outline-none focus:border-primary-500"
      />
      <div className="flex justify-start items-center gap-1 h-[40px]">
        <IconButton variant="plain" color="neutral" onClick={() => applyStyle('bold')}>
          <MdFormatBold className="text-content-color text-[1.2rem]" />
        </IconButton>
        <IconButton variant="plain" color="neutral" onClick={() => applyStyle('italic')}>
          <MdOutlineFormatItalic className="text-content-color text-[1.2rem]" />
        </IconButton>
        <IconButton variant="plain" color="neutral" onClick={handleBulletPoints}>
          <MdOutlineFormatListBulleted className="text-content-color text-[1.2rem]" />
        </IconButton>
        <IconButton variant="plain" color="neutral" onClick={handleNumberedList}>
          <MdOutlineFormatListNumbered className="text-content-color text-[1.2rem]" />
        </IconButton>
        <IconButton variant="plain" color="neutral" onClick={() => handleIndent(true)}>
          <MdFormatIndentIncrease className="text-content-color text-[1.2rem]" />
        </IconButton>
        <IconButton variant="plain" color="neutral" onClick={() => handleIndent(false)}>
          <MdFormatIndentDecrease className="text-content-color text-[1.2rem]" />
        </IconButton>
      </div>
      {errors && <p className={errorStyle}>{errors.message}</p>}
    </FormControl>
  );
}