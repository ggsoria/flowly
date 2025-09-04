import { useState } from "react";
import { Widget } from "./Widget";
import { CreditCard } from "./CreditCard";
import type { CreditCardModel } from "../../models/CreditCardModel";
import { GrNext, GrPrevious } from "react-icons/gr";

const creditCards: CreditCardModel[] = [
  {
    id: "1",
    name: "Visa Platinum",
    bankId: "santander",
    balance: [
      {
        id: "c1",
        bankId: "santander",
        amount: 1500,
        currency: "USD",
        installments: 3,
        installmentValue: 500,
        remainingInstallments: 2,
        startDate: "2025-08-01",
        endDate: "2025-10-01",
        isActive: true,
        description: "Netflix",
      },
      {
        id: "c2",
        bankId: "santander",
        amount: 200,
        currency: "ARS",
        installments: 1,
        installmentValue: 200,
        remainingInstallments: 3,
        startDate: "2025-08-10",
        endDate: "2025-08-10",
        isActive: false,
        description: "Optica",
      },
      {
        id: "c3",
        bankId: "santander",
        amount: 1500,
        currency: "ARS",
        installments: 3,
        installmentValue: 500,
        remainingInstallments: 2,
        startDate: "2025-08-01",
        endDate: "2025-10-01",
        isActive: true,
        description: "Pedidos ya",
      },
      {
        id: "c2",
        bankId: "santander",
        amount: 200,
        currency: "USD",
        installments: 1,
        installmentValue: 200,
        remainingInstallments: 7,
        startDate: "2025-08-10",
        endDate: "2025-08-10",
        isActive: false,
        description: "Didi",
      },
      {
        id: "c1",
        bankId: "santander",
        amount: 1500,
        currency: "USD",
        installments: 3,
        installmentValue: 500,
        remainingInstallments: 2,
        startDate: "2025-08-01",
        endDate: "2025-10-01",
        isActive: true,
        description: "Super",
      },
      {
        id: "c2",
        bankId: "santander",
        amount: 200,
        currency: "USD",
        installments: 1,
        installmentValue: 200,
        remainingInstallments: 10,
        startDate: "2025-08-10",
        endDate: "2025-08-10",
        isActive: false,
        description: "Monotributo",
      },
    ],
    limit: 5000,
    available: 3300,
    closingDate: "2025-08-20",
    dueDate: "2025-09-05",
    currency: "USD",
  },
  {
    id: "2",
    name: "Mastercard Gold",
    bankId: "mercadopago",
    balance: [
      {
        id: "c3",
        bankId: "mercadopago",
        amount: 600,
        currency: "ARS",
        installments: 6,
        installmentValue: 100,
        remainingInstallments: 4,
        startDate: "2025-07-15",
        endDate: "2025-12-15",
        isActive: true,
        description: "super",
      },
    ],
    limit: 3000,
    available: 2400,
    closingDate: "2025-08-18",
    dueDate: "2025-09-02",
    currency: "ARS",
  },
  {
    id: "3",
    name: "American Express Green",
    bankId: "bcoProvincia",
    balance: [
      {
        id: "c4",
        bankId: "uala",
        amount: 1200,
        currency: "USD",
        installments: 12,
        installmentValue: 100,
        remainingInstallments: 8,
        startDate: "2025-01-01",
        endDate: "2025-12-01",
        isActive: true,
        description: "Didi",
      },
    ],
    limit: 4000,
    available: 2800,
    closingDate: "2025-08-22",
    dueDate: "2025-09-07",
    currency: "USD",
  },
];

export const CreditWidget = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Widget type={"credit"} detailsButton>
      <div className="relative flex flex-8 px-6 pb-4 overflow-hidden">
        <button
          className="top-1/2 left-0 z-10 absolute h-full -translate-y-1/2 hover:cursor-pointer"
          onClick={() => setCurrentIndex((prev) => prev - 1)}
          hidden={currentIndex === 0}
        >
          <GrPrevious className="w-8 h-full" />
        </button>
        {creditCards.map((card, index) => (
          <div
            key={index}
            className="flex px-2 min-w-full max-w-[100px] overflow-hidden transition-transform duration-300"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <CreditCard creditCard={card} isActive={currentIndex === index} />
          </div>
        ))}
        <button
          className="top-1/2 right-0 z-10 absolute h-full text-white -translate-y-1/2 hover:cursor-pointer"
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          hidden={currentIndex === creditCards.length - 1}
        >
          <GrNext className="w-8 h-full" />
        </button>
      </div>

      <div className="flex flex-0.5 justify-center items-center space-x-2 py-2">
        {creditCards.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition ${
              currentIndex === index ? "bg-blue-700" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      <div className="flex flex-1.5 justify-between gap-6 pt-2 rounded-lg text-sm">
        <div className="flex gap-3">
          <span>Deuda Total:</span>
        </div>
        <div className="flex gap-3">
          <span>
            ARS $
            {creditCards[currentIndex].balance
              .filter((card) => card.currency === "ARS")
              .reduce(
                (acc, credit) =>
                  acc +
                  credit.amount -
                  credit.installmentValue *
                    (credit.installments - credit.remainingInstallments),
                0
              )}
          </span>
          <span>
            USD $
            {creditCards[currentIndex].balance
              .filter((card) => card.currency === "USD")
              .reduce(
                (acc, credit) =>
                  acc +
                  credit.amount -
                  credit.installmentValue *
                    (credit.installments - credit.remainingInstallments),
                0
              )}
          </span>
        </div>
      </div>
    </Widget>
  );
};
