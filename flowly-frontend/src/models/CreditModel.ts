import type { GenericModel } from "./GenericModel";

export interface CreditModel extends GenericModel {
  bankId: string;
  description: string;
  amount: number;
  currency: "ARS" | "USD" | "EUR";
  installments: number;
  installmentValue: number;
  remainingInstallments: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}
