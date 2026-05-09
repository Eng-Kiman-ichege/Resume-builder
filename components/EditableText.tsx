"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  value: string;
  onUpdate: (newValue: string) => void;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onUpdate,
  className,
  multiline = false,
  placeholder = "Click to edit...",
  style,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleBlur = () => {
    setIsEditing(false);
    const newValue = elementRef.current?.innerText || "";
    if (newValue !== value) {
      onUpdate(newValue);
    }
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  // Handle case where value might be empty but we need to show something to click
  const displayValue = localValue || (isEditing ? "" : placeholder);

  return (
    <div
      ref={elementRef}
      contentEditable
      suppressContentEditableWarning
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={cn(
        "outline-none transition-all duration-200 rounded-sm relative group",
        isEditing ? "bg-blue-50/50 ring-1 ring-blue-200" : "hover:bg-blue-50/30 hover:ring-1 hover:ring-blue-100",
        !localValue && !isEditing && "text-slate-300 italic",
        className
      )}
      style={{
        ...style,
        minWidth: "1em",
        minHeight: "1em",
      }}
    >
      {localValue}
      {!localValue && !isEditing && (
        <span className="pointer-events-none opacity-50">{placeholder}</span>
      )}
      
      {/* "Canva-like" Edit Badge on hover */}
      {!isEditing && (
        <div className="absolute -top-6 left-0 bg-blue-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-tighter">
          Edit
        </div>
      )}
    </div>
  );
};
