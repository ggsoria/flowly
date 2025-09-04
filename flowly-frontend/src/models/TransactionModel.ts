import type { GenericModel } from "./GenericModel";
import type { TransactionType } from "../types/TransactionType";

export interface TransactionModel extends GenericModel {
  type: TransactionType;
  amount: number;
  currency: string;
  description: string;
  //transacction between accounts
  accountId: string;
  targetAccountId?: string;
  //currency conversion
  sourceCurrency?: string;
  targetCurrency?: string;
  exchangeRate?: number;
  //credit card payment
  suscription?: boolean;
}
