import type { CurrencyType } from "../types/CurrencyType";
import type { InstitutionsType } from "../types/institutionsType";
import type { CreditModel } from "./CreditModel";
import type { GenericModel } from "./GenericModel";

export interface CreditCardModel extends GenericModel {
  name: string;
  bankId: InstitutionsType;
  balance: CreditModel[];
  limit: number;
  available: number;
  closingDate: string;
  dueDate: string;
  currency: CurrencyType;
}
