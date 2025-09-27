import React, { useState } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
}

export function Button({ 
  onClick, 
  children, 
  className = '', 
  disabled = false, 
  variant = 'primary' 
}: ButtonProps) {
  const getHoverStyles = () =>
    'hover:translate-y-[-1px] hover:scale-105 hover:transition-transform hover:duration-300 hover:ease-in-out';

  const getVariantClass = () => {
    const hoverStyles = getHoverStyles();

    switch (variant) {
        case 'primary':
            return 'simcity-button';
        case 'secondary':
            return `bg-gray-600 text-white hover:bg-gray-700 rounded-md ${hoverStyles}`;
        case 'success':
            return `bg-green-600 text-white hover:bg-green-700 rounded-md mx-2 ${hoverStyles}`;
        case 'danger':
            return `bg-red-600 text-white hover:bg-red-700 rounded-md ${hoverStyles}`;
        default:
            return 'simcity-button';
    }
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${getVariantClass()} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`simcity-card overflow-hidden ${className}`}>
      {title && (
        <div className="w-full px-4 py-3 text-center mb-2">
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
      )}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}

interface InputProps {
  label?: string;
  type?: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
}

export function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  className = '',
  error,
  disabled = false
}: InputProps) {
  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-sm font-medium text-white mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-3 py-2 border ${error ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-70' : ''}`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

interface SelectProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Select({ 
  label, 
  options, 
  value, 
  onChange, 
  className = '' 
}: SelectProps) {
  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="dropdown"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface ItemGridProps<T extends { id: string; name: string; image?: string }> {
  items: T[];
  onSelect: (item: T) => void;
  className?: string;
}

export function ItemGrid<T extends { id: string; name: string; image?: string }>({
  items,
  onSelect,
  className = '',
}: ItemGridProps<T>) {
  return (
    <div className={`grid grid-cols-5 md:grid-cols-5 gap-4 ${className}`}>
      {items.map(item => (
        <div 
          key={item.id} 
          onClick={() => onSelect(item)}
          className="glass-card cursor-pointer"
        >
          <div className="item-image-container">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-18 h-18 object-contain"
            />
          </div>
          <span className="text-sm font-semibold text-center text-white mt-2">{item.name}</span>
        </div>
      ))}
    </div>
  );
}

interface QuantityControlProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantityControl({
  value,
  onChange,
  min = 1,
  max = 99,
  className = ''
}: QuantityControlProps) {
  const decrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increase = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <button
        onClick={decrease}
        disabled={value <= min}
        className="w-8 h-8 flex items-center justify-center border-none rounded-l-md simcity-button disabled:opacity-50"
      >
        -
      </button>
    <div className="w-10 h-8 flex items-center justify-center bg-white rounded-md font-bold">
        {value}
      </div>
      <button
        onClick={increase}
        disabled={value >= max}
        className="w-8 h-8 flex items-center justify-center border-none rounded-r-md simcity-button disabled:opacity-50"
      >
        +
      </button>
    </div>
  );
}

interface WarRewardQuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export function WarRewardQuantitySelector({
  value,
  onChange,
  className = ''
}: WarRewardQuantitySelectorProps) {
  return (
    <div className={`${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Expected Reward Quantity (1-3)
      </label>
      <div className="flex space-x-2">
        {[1, 2, 3].map((quantity) => (
          <button
            key={quantity}
            onClick={() => onChange(quantity)}
            className={`px-4 py-2 rounded-md font-medium transition-colors border ${
              value === quantity
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {quantity}
          </button>
        ))}
      </div>
    </div>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        {/* Modal content */}
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform modal shadow-xl rounded-lg">
          {title && (
            <div className="mb-4 text-center">
              <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
          )}
          
          {children}
        </div>
      </div>
    </div>
  );
}

export function DraggableModal({ isOpen, onClose, children, title }: ModalProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const modal = e.currentTarget;
    const rect = modal.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const modal = e.currentTarget;
      modal.style.left = `${e.clientX - position.x}px`;
      modal.style.top = `${e.clientY - position.y}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="absolute bg-white shadow-xl rounded-lg p-6"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {title && (
          <div className="mb-4 text-center">
            <h3 className="text-xl font-bold text-black">{title}</h3>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
