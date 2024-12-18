"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
  className?: string;
}

export function LoadingButton({ children, onClick, className = "", ...props }: LoadingButtonProps) {
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

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      data-loading={isLoading}
      className={`group relative disabled:opacity-100 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${className}`}
      {...props}
    >
      <span className="group-data-[loading=true]:text-transparent">{children}</span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="animate-spin" size={16} strokeWidth={2} aria-hidden="true" />
        </div>
      )}
    </button>
  );
} 