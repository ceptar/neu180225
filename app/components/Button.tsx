import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  animated?: boolean;
}

export function Button({ animated = false, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'relative overflow-hidden border-2 border-discogray px-6 py-3 uppercase text-discogray transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none',
        props.className,
      )}
    >
      <span className="relative z-10">{props.children}</span>
    </button>
  );
}