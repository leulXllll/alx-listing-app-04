import React from 'react';
import { CardProps } from '../../interfaces';

const Card: React.FC<CardProps> = ({ title, description, image }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-md mb-2" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;
