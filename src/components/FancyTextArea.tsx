import React, { useState, useRef, useEffect } from 'react';
import { Box, FormControl, IconButton } from '@mui/joy';
import { MdFormatBold, MdOutlineFormatItalic, MdOutlineFormatListBulleted, MdOutlineFormatListNumbered } from "react-icons/md";

interface FancyTextAreaProps {
  onChange: (html: string) => void;
  errors: any;
  register: any;
  instruction: string; // Add the instruction prop
}

export default function FancyTextArea({ onChange, errors, register, instruction }: FancyTextAreaProps) {
  const [fontWeight, setFontWeight] = useState<'200' | 'normal' | 'bold'>('normal');
  const editorRef = useRef<HTMLDivElement>(null);

  const errorStyle = "text-[.8rem] text-red-400";

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = instruction; // Set the initial value from the instruction prop
      editorRef.current.focus();
    }
  }, [instruction]); // Run this effect when instruction changes

  const updateContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertListAtCursor = (listType: 'ul' | 'ol') => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const listElement = document.createElement(listType);
      const listItem = document.createElement('li');
      listElement.className = listType === 'ul' ? "list-disc px-7" : "list-decimal px-7";
      listItem.appendChild(document.createTextNode('\u00A0')); // Add a non-breaking space
      listElement.appendChild(listItem);
      range.insertNode(listElement);

      // Move the cursor inside the list item
      range.setStart(listItem, 0);
      range.setEnd(listItem, 0);
      selection.removeAllRanges();
      selection.addRange(range);

      editorRef.current?.focus();
      updateContent();
    }
  };

  const handleBulletPoints = () => {
    insertListAtCursor('ul');
  };

  const handleNumberedList = () => {
    insertListAtCursor('ol');
  };

  const applyStyle = (style: 'bold' | 'italic') => {
    document.execCommand(style, false, undefined);
    editorRef.current?.focus();
    updateContent();
  };

  const handleInput = () => {
    updateContent();
    renumberLists();
  };

  const renumberLists = () => {
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
  };

  return (
    <FormControl className="w-full border-b border-[#D1D5DB]">
      <p className="text-[1.2rem] font-semibold pt-2 mb-2">Instructions</p>
      <Box
        {...register('instructions')}
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="rounded-xl border border-neutral-300 min-h-[130px] p-1 font-inherit text-inherit focus:outline-none focus:border-primary-500"
      >
      </Box>
      <div className="flex justify-start items-center gap-1 pt-1 h-[30px]">
        <IconButton
          variant="plain"
          color="neutral"
          onClick={() => applyStyle('bold')}
        >
          <MdFormatBold className="text-content-color text-[1.2rem]" />
        </IconButton>
        <IconButton
          variant="plain"
          color="neutral"
          onClick={() => applyStyle('italic')}
        >
          <MdOutlineFormatItalic className="text-content-color text-[1.2rem]" />
        </IconButton>
        <IconButton
          variant="plain"
          color="neutral"
          onClick={handleBulletPoints}
        >
          <MdOutlineFormatListBulleted className="text-content-color text-[1.2rem]" />
        </IconButton>
        <IconButton
          variant="plain"
          color="neutral"
          onClick={handleNumberedList}
        >
          <MdOutlineFormatListNumbered className="text-content-color text-[1.2rem]" />
        </IconButton>
      </div>

      {errors && <p className={errorStyle}>{errors.message}</p>}
    </FormControl>
  );
}
