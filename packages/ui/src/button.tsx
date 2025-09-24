"use client";

import { ReactNode } from "react";

interface ButtonProps {
  type?: "submit" | "reset" | "button" | undefined;
  children: ReactNode;
  className?: string;
  appName?: string;
}

export const Button = ({ children, className, appName, type }: ButtonProps) => {
  return (
    <button type={type} className={className}>
      {children}
    </button>
  );
};
