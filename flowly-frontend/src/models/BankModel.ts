import type { accountIcons } from "../utils/accountIcons";
import type { GenericModel } from "./GenericModel";

export interface BankModel extends GenericModel {
  name: string;
  shortName?: string;
  country: string;
  icon: keyof typeof accountIcons;
}
