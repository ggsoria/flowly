import { Widget } from "./Widget";
import { accountIcons } from "../../utils/accountIcons";
import { SlOptionsVertical } from "react-icons/sl";
import { useState } from "react";
import type { AccountType } from "../../types/AccountType";
import type { CurrencyType } from "../../types/CurrencyType";
import { ScrollableContainer } from "../ScrollableContainer";
import { TbTransfer } from "react-icons/tb";
import { MdOutlineSavings } from "react-icons/md";
import { Tooltip } from "../Tooltip";
import type { AccountModel } from "../../models/AccountModel";

export const AccountsWidget = () => {
  const [accountsType, setAccountsType] = useState<AccountType>("checking");
  const accounts: AccountModel[] = [
    {
      id: "1",
      name: "Mercado Pago",
      balance: 1500.231,
      currency: "ARS",
      transactions: [],
      type: "checking",
      institution: {
        id: "bank1",
        name: "Mercado Pago",
        shortName: "mp",
        country: "Argentina",
        icon: "mercadopago",
      },
    },
    {
      id: "2",
      name: "Santander",
      balance: 5000.0,
      currency: "ARS",
      transactions: [],
      type: "checking",
      institution: {
        id: "bank12",
        name: "Santander",
        shortName: "stdr",
        country: "Argentina",
        icon: "santander",
      },
    },
    {
      id: "3",
      name: "Cuenta DNI",
      balance: 20000.0,
      currency: "ARS",
      transactions: [],
      type: "savings",
      institution: {
        id: "bank42",
        name: "Banco Provincia",
        shortName: "cdni",
        country: "Argentina",
        icon: "bcoProvincia",
      },
    },
    {
      id: "4",
      name: "Uala",
      balance: 30000.0,
      currency: "USD",
      transactions: [],
      type: "savings",
      institution: {
        id: "bank13",
        name: "Uala",
        shortName: "uala",
        country: "Argentina",
        icon: "uala",
      },
    },
    {
      id: "5",
      name: "Efectivo",
      balance: 3000.0,
      currency: "ARS",
      transactions: [],
      type: "checking",
      institution: {
        id: "bank1",
        name: "Efectivo",
        shortName: "cash",
        country: "Argentina",
        icon: "cash",
      },
    },

    {
      id: "6",
      name: "Uala USD",
      balance: 3000.0,
      currency: "USD",
      transactions: [],
      type: "investment",
      institution: {
        id: "bank13",
        name: "Uala",
        shortName: "uala",
        country: "Argentina",
        icon: "uala",
      },
    },
    {
      id: "7",
      name: "Santander USD",
      balance: 3450.0,
      currency: "USD",
      transactions: [],
      type: "investment",
      institution: {
        id: "bank1",
        name: "Santander",
        shortName: "stdr",
        country: "Argentina",
        icon: "santander",
      },
    },
    {
      id: "8",
      name: "Payoneer",
      balance: 4256.0,
      currency: "USD",
      transactions: [],
      type: "investment",
      institution: {
        id: "bank41",
        name: "Payoneer",
        country: "USA",
        icon: "other",
      },
    },
  ];

  const getAccountIcon = (institution: string) => {
    switch (institution) {
      case "mercadopago":
        return accountIcons.mercadopago;
      case "santander":
        return accountIcons.santander;
      case "bcoProvincia":
        return accountIcons.bcoProvincia;
      case "uala":
        return accountIcons.uala;
      case "cash":
        return accountIcons.cash;
      default:
        return accountIcons.other;
    }
  };

  const accountItem = (account: AccountModel) => {
    return (
      <div
        key={account.id}
        className="flex mr-2 py-2 border-b border-border-light dark:border-border-dark"
      >
        <div className="flex flex-1">
          <div className="self-center">
            <img
              src={getAccountIcon(account.institution.icon)}
              alt={account.institution.name}
              className="px-2 w-10"
            />
          </div>

          <div className="flex flex-col flex-1 justify-around">
            <span className="text-dark-txt-hover text-sm">{account.name}</span>
            {/* <span className="font-light text-dark-txt text-xs">
            {account.institution}
          </span> */}
          </div>

          <div className="flex items-center gap-1 h-full">
            <div className="pr-1 font-medium text-primary-light dark:text-primary-dark text-sm">
              {account.currency} ${account.balance.toFixed(2)}
            </div>
            <Tooltip text={"Transferir entre cuentas"}>
              <div className="hover:bg-button dark:hover:bg-button-hover px-1 py-1 rounded-md h-full text-secondary-light hover:text-primary-dark dark:hover:text-primary-dark dark:text-secondary-dark cursor-pointer">
                <TbTransfer className="w-4" />
              </div>
            </Tooltip>
            <Tooltip text={"Agregar a reserva"}>
              <div className="hover:bg-button dark:hover:bg-button-hover px-1 py-1 rounded-md h-full text-secondary-light hover:text-primary-dark dark:hover:text-primary-dark dark:text-secondary-dark cursor-pointer">
                <MdOutlineSavings className="w-4" />
              </div>
            </Tooltip>
            <Tooltip text="Opciones">
              <div className="hover:bg-button-hover dark:hover:bg-button-hover py-1 rounded-md h-full text-primary-light dark:text-primary-dark cursor-pointer">
                <SlOptionsVertical className="w-4" />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  };

  const filterAccounts = (account: AccountModel) => {
    switch (accountsType) {
      case "checking":
        return account.type === "checking";
      case "savings":
        return account.type === "savings" || account.type === "investment";
      case "all":
        return accounts;
    }
  };

  const filteredAccounts = (currency: CurrencyType) =>
    accounts
      .filter((account) => account.currency === currency)
      .filter((account) => filterAccounts(account))
      .sort((a, b) => b.balance - a.balance);

  return (
    <Widget type={"accounts"} addButton detailsButton>
      <div className="flex flex-col justify-between w-full h-full overflow-hidden">
        <div className="flex gap-4 mr-6 mb-4 text-sm">
          <button
            className={` hover:cursor-pointer text-primary-dark ${
              accountsType === "checking"
                ? "border-b-1 font-bold  text-white"
                : ""
            }`}
            onClick={() => setAccountsType("checking")}
          >
            DIARIO
          </button>
          <button
            className={` hover:cursor-pointer text-primary-dark ${
              accountsType === "savings"
                ? "border-b-1 font-bold  text-white"
                : ""
            }`}
            onClick={() => setAccountsType("savings")}
          >
            RESERVA
          </button>
          <button
            className={` hover:cursor-pointer text-primary-dark ${
              accountsType === "all" ? "border-b-1 font-bold  text-white" : ""
            }`}
            onClick={() => setAccountsType("all")}
          >
            TODAS LAS CUENTAS
          </button>
        </div>
        <ScrollableContainer scrollY={true}>
          <div className="flex flex-col">
            {filteredAccounts("ARS").length > 0 && (
              <div className="flex-grow text-sm">ARS</div>
            )}
            {filteredAccounts("ARS").map((account) => accountItem(account))}
          </div>
          <div className="flex flex-col">
            {filteredAccounts("USD").length > 0 && (
              <div className="flex-grow mt-4 text-sm">USD</div>
            )}
            {filteredAccounts("USD").map((account) => accountItem(account))}
          </div>
        </ScrollableContainer>
        <div className="flex justify-end gap-6 pt-4 pr-2 rounded-lg text-sm">
          <span>Total ARS: $3.124</span>
          <span>Total USD: $3.124</span>
        </div>
      </div>
    </Widget>
  );
};
