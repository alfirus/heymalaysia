import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div className={twMerge('bg-gray-900 border border-gray-800 rounded-xl p-6', className)}>
      {children}
    </div>
  );
};
