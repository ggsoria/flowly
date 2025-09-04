import type { GenericModel } from "./GenericModel";

export type PaymentStatus = "pending" | "paid" | "overdue";
export type PaymentCategory = "credit" | "cash";

export interface PaymentModel extends GenericModel {
  title: string;
  amount: number;
  currency: string;
  dueDate: string;
  status: PaymentStatus;
  category: PaymentCategory;
  description?: string;
}
