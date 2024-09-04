import React, { useState, useRef, useEffect } from 'react';
import { Box, FormControl, FormLabel, IconButton, Menu, MenuItem, ListItemDecorator } from '@mui/joy';
import { MdFormatBold, MdOutlineFormatItalic, MdOutlineFormatListBulleted, MdOutlineFormatListNumbered } from "react-icons/md";

export default function FancyTextArea({ onChange, errors, register }: { onChange: (html: string) => void, errors: any, register: any }) {
  const [fontWeight, setFontWeight] = useState<'200' | 'normal' | 'bold'>('normal');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const errorStyle = "text-[.8rem] text-red-400";

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

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
      if(listType === "ul"){
        listElement.className = "list-disc px-7"
        // listItem.className = "list-disc"
      } else {
        listElement.className = "list-decimal px-7"
        // listItem.className = "list-decimal"

      }
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
        {/* <div className="space-y-2">
          <div className="space-x-1">
            <span className="font-bold">Bold</span>
            <span className="italic">Italic</span>
          </div>
          <ul className="list-disc pl-4">
            <li>Bullet Point 1</li>
            <li>Bullet Point 2</li>
          </ul>
          <ol className="list-decimal pl-4">
            <li>Numbered List 1</li>
            <li>Numbered List 2</li>
          </ol>
        </div> */}
      </Box>
      <div className="flex justify-start items-center gap-1 pt-1 h-[30px]">
        <IconButton
          variant="plain"
          color="neutral"
          onClick={() => applyStyle('bold')}
          className="bg-blue-500"
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