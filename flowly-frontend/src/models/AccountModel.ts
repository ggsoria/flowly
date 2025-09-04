import type { AccountType } from "../types/AccountType";
import type { CurrencyType } from "../types/CurrencyType";
import type { BankModel } from "./BankModel";
import type { GenericModel } from "./GenericModel";
import type { Transaction } from "./TransactionModel";

export interface AccountModel extends GenericModel {
  name: string;
  balance: number;
  currency: CurrencyType;
  transactions: Transaction[];
  institution: BankModel;
  type: AccountType;
}
