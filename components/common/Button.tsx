import React from 'react';
import { ButtonProps } from '../../interfaces';

const Button: React.FC<ButtonProps> = ({ text, onClick, variant = 'primary' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${variant === 'primary' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
    >
      {text}
    </button>
  );
};

export default Button;
