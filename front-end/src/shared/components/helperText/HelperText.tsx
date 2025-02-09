 
import React from 'react';

interface HelperTextProps {
  text: string;
  error: boolean;
  className?: string;
  readonly?: boolean;
  modal?: boolean;
  showIcon?: boolean;
}

export function HelperText({
  text,
  error,
  className = '',
  readonly = false,
  modal = false,
}: HelperTextProps) {
  return (
    <div className={`flex items-center pl-2 pt-1 ${className}`}>
      <p
        className={` font-light text-[10px] pt-[1px] m-0 leading-[12px] ${
          error
            ? 'text-red-500 '
            : readonly
              ? 'text-complementario-70'
              : modal
                ? 'text-primario-20'
                : 'text-gris-40'
        } float-left`}
      >
        <span>{text}</span>
      </p>
    </div>
  );
}