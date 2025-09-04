import { useState } from "react";

interface ToggleProps {
  size: "sm" | "md";
  label: {
    r: string;
    l: string;
  };
}

export const Toggle = ({ size, label }: ToggleProps) => {
  const [enabled, setEnabled] = useState(false);

  const toggleDimensions = {
    sm: {
      h: "h-5",
      w: "w-9",
      insideH: "h-3",
      insideW: "w-3",
      translation: "translate-x-5",
    },
    md: {
      h: "h-6",
      w: "w-11",
      insideH: "h-4",
      insideW: "w-4",
      translation: "translate-x-6",
    },
  };

  return (
    <div className="flex items-center">
      {label.l && (
        <span
          className={`px-2 text-xs 
        ${
          enabled
            ? "text-primary-light dark:text-primary-dark"
            : "text-secondary-light dark:text-secondary-dark font-light"
        } flex-grow`}
        >
          {label.l}
        </span>
      )}
      <button
        onClick={() => setEnabled(!enabled)}
        className={`inline-flex  items-center rounded-full transition hover:cursor-pointer
          ${
            enabled
              ? "bg-positive dark:bg-positive"
              : "bg-button dark:bg-button hover:bg-primary-light dark:hover:bg-button-hover "
          } ${toggleDimensions[size].h} ${toggleDimensions[size].w} `}
      >
        <span
          className={`inline-block transform rounded-full bg-white transition 
            ${enabled ? toggleDimensions[size].translation : "translate-x-1"} ${
            toggleDimensions[size].insideH
          } ${toggleDimensions[size].insideW}`}
        />
      </button>
      {label.r && (
        <span
          className={`px-2 text-xs 
        ${
          enabled
            ? "text-primary-light dark:text-primary-dark font-bold"
            : "text-secondary-light dark:text-secondary-dark font-light"
        } flex-grow`}
        >
          {label.r}
        </span>
      )}
    </div>
  );
};
