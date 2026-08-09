"use client";

import { useState, useRef } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

export function ScrambleText({ text, className = "", as: Component = "span" }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 2;
    }, 25);
  };

  return (
    <Component
      onMouseEnter={scramble}
      className={`inline-block transition-colors duration-200 ${className}`}
    >
      {displayText}
    </Component>
  );
}
