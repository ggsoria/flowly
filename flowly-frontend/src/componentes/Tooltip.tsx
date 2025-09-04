import { useState, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  text: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const Tooltip = ({
  text,
  children,
  className,
  delay = 15,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ top: rect.top, left: rect.left + rect.width / 2 });
    setVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), delay);
  };

  return (
    <>
      <div
        className="inline-block relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      {visible &&
        createPortal(
          <div
            className={`
              fixed z-50  max-w-50  bg-gray-800 text-white text-xs font-medium
              px-3 py-2 rounded-md shadow-lg transform -translate-x-1/2 -translate-y-8 transition-opacity duration-150
              ${className ?? ""}
            `}
            style={{ top: coords.top - 10, left: coords.left }}
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            {text}
          </div>,
          document.body
        )}
    </>
  );
};
