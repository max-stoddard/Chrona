import React from 'react';
import type { ReactNode } from 'react';
import '../styles/card.css';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`card ${className}`}>
    {children}
  </div>;
};

export default Card;