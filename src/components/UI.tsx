// UI Components for the lifestyle planner
import React from 'react';

export interface UIComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export const Button: React.FC<UIComponentProps & { onClick?: () => void }> = ({
  children,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 ${className}`}
    >
      {children}
    </button>
  );
};

export const Card: React.FC<UIComponentProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
};
