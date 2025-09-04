import type { WidgetType } from "../types/WigetType";

export interface WidgetModel {
  type: WidgetType;
  detailsButton: boolean;
  addButton: boolean;
  currencyButton: boolean;
  onCurrencyClick?: () => void;
  onDetailsClick?: () => void;
  onAddClick?: () => void;
}
