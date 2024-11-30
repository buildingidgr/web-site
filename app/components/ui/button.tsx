"use client";

import { LoaderCircle } from "lucide-react";
import { useState } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm';
}

export function Button({ 
  children, 
  onClick, 
  className = "", 
  variant = 'default',
  size = 'default',
  ...props 
}: ButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = async () => {
    if (onClick) {
      setIsLoading(true);
      try {
        await onClick();
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'outline':
        return 'border border-gray-300 bg-transparent hover:bg-gray-50';
      default:
        return 'bg-blue-600 text-white hover:bg-blue-700';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      default:
        return 'px-4 py-2';
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      data-loading={isLoading}
      className={`group relative disabled:opacity-100 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      {...props}
    >
      <span className="group-data-[loading=true]:text-transparent">{children}</span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoaderCircle className="animate-spin" size={16} strokeWidth={2} aria-hidden="true" />
        </div>
      )}
    </button>
  );
} 