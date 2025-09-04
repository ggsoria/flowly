import { type ReactNode } from "react";
import { WidgetTopHeader } from "./WidgetTopHeader";
import type { WidgetType } from "../../types/WigetType";
import type { DateTime } from "luxon";

interface WidgetProps {
  type: WidgetType;
  detailsButton?: boolean;
  addButton?: boolean;
  currencyButton?: boolean;
  onCurrencyClick?: () => void;
  date?: DateTime;
  children: ReactNode;
}

export const Widget = ({
  type,
  detailsButton = false,
  addButton = false,
  currencyButton = false,
  onCurrencyClick,
  children,
}: WidgetProps) => {
  return (
    <div className="flex flex-col bg-[linear-gradient(135deg,#ffffff,#edf0f4)] dark:bg-[linear-gradient(135deg,#10131a,#0b0e12)] p-3 border-1 border-border-light dark:border-border-dark rounded-lg w-full h-full text-primary-light dark:text-primary-dark text-lg">
      <WidgetTopHeader
        type={type}
        detailsButton={detailsButton}
        addButton={addButton}
        currencyButton={currencyButton}
        onCurrencyClick={onCurrencyClick}
      />
      {children}
    </div>
  );
};
