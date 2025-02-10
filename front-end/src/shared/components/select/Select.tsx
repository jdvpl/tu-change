import React, { useState, useRef, useEffect, Suspense } from 'react';
import Input from '../Input/Input';
import {ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/24/solid';

interface SelectProps {
  options: { value: string; label: string }[];
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
  name: string;
  error?: boolean;
  helperText?: string;
  errorType?: 'warning' | 'error';
}
function Select({
  options,
  placeholder,
  value,
  onChange,
  name,
  error,
  helperText,
  errorType,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [hasNavigatedWithKeyboard, setHasNavigatedWithKeyboard] =
    useState(false);
  const [openDirection, setOpenDirection] = useState<'up' | 'down'>('down');
  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const selectContainer = selectRef.current;
    if (selectContainer) {
      const button = selectContainer.querySelector('.select-container button');
      if (button) {
        button.setAttribute('tabIndex', '-1');
      }
    }
  }, []);

  const handleToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!isOpen) {
      calculateDropdownPosition();
      setHighlightedIndex(-1);
      setHasNavigatedWithKeyboard(false);
    }
    setIsOpen(prev => !prev);
    event.preventDefault();
  };

  const calculateDropdownPosition = () => {
    if (!selectRef.current) return;
    const rect = selectRef.current.getBoundingClientRect();
    const dropdownHeight = 196;
    const isEnoughSpaceBelow =
      rect.bottom + dropdownHeight <= window.innerHeight;
    const isEnoughSpaceAbove = rect.top - dropdownHeight >= 0;

    if (isEnoughSpaceBelow) {
      setOpenDirection('down');
    } else if (isEnoughSpaceAbove) {
      setOpenDirection('up');
    } else {
      setOpenDirection('down');
    }
  };

  const handleOptionClick = (option: { value: string; label: string }) => {
    if (typeof onChange === 'function') {
      onChange(option.value);
    }
    setIsOpen(false);
    setHighlightedIndex(-1);
    setHasNavigatedWithKeyboard(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setHighlightedIndex(-1);
      setHasNavigatedWithKeyboard(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    setHasNavigatedWithKeyboard(true);
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setHighlightedIndex(0);
        } else {
          setHighlightedIndex(prevIndex => (prevIndex + 1) % options.length);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setHighlightedIndex(options.length - 1);
        } else {
          setHighlightedIndex(prevIndex =>
            prevIndex === 0 ? options.length - 1 : prevIndex - 1
          );
        }
        break;
      case 'Enter':
        event.preventDefault();
        if (isOpen && highlightedIndex !== -1) {
          handleOptionClick(options[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown as EventListener);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown as EventListener);
    };
  }, [isOpen, highlightedIndex]);

  const selectedOption = options.find(option => option.value === value);
  const selectedLabel = selectedOption ? selectedOption.label : '';
  const labelClass = value ? 'label-with-value' : '';

  return (
    <Suspense fallback={null}>
      <div
        className={`relative w-full select-container ${labelClass}`}
        ref={selectRef}
      >
        <Input
          placeholder={placeholder}
          id={name}
          label={placeholder}
          rightIcon={isOpen ? <ChevronUpIcon className='size-6'/>: <ChevronDownIcon className='size-6'/>}
          onClick={handleToggle}
          value={selectedLabel}
          name={name}
          error={error}
          helperText={errorType === 'error' ? helperText : ''}
        />
        {typeof selectedLabel !== 'string' && (
          <button
            type="button"
            onClick={handleToggle}
            className="absolute top-2 left-3 bg-white w-[85%] flex justify-start"
          >
            {selectedLabel}
          </button>
        )}
       
        {isOpen && (
          <ul
            ref={dropdownRef}
            className={`absolute  text-blue-900 w-full bg-white z-40 shadow-md rounded-lg mt-1 max-h-[196px] overflow-y-auto ${
              openDirection === 'up' ? 'bottom-full mb-1' : 'top-full mt-1'
            }`}
            role="listbox"
            tabIndex={-1}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                id={option.value}
                data-testid={option.value}
                className={`px-4 py-2 cursor-pointer 
                ${highlightedIndex === index && hasNavigatedWithKeyboard ? 'bg-gray-200' : ''} 
                ${value === option.value ? ' text-blue-900 bg-blue-200' : ''} 
                hover:bg-gray-200`}
                onClick={() => handleOptionClick(option)}
                role="option"
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOptionClick(option);
                  }
                }}
                aria-selected={value === option.value}
                tabIndex={0}
                onMouseEnter={() => setHighlightedIndex(-1)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Suspense>
  );
}

export default Select;
