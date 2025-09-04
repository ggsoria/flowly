import { DateTime } from "luxon";
import { ScrollableContainer } from "../ScrollableContainer";
import type { TransactionModel } from "../../models/TransactionModel";
import { Widget } from "./Widget";
import { formatDateMMdd } from "../../utils/dateUtils";
import type { TransactionType } from "../../types/TransactionType";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useState } from "react";

interface TransactionsWidgetProps {
  date: DateTime;
}

//Consider pagination
export const TransactionsWidget = (props: TransactionsWidgetProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const data: TransactionModel[] = [
    {
      id: "t1",
      type: "expense",
      amount: 1200,
      currency: "ARS",
      description: "Supermercado Carrefour",
      accountId: "acc1",
      createdAt: "2025-08-01T10:15:00Z",
      updatedAt: "2025-08-01T10:15:00Z",
    },
    {
      id: "t2",
      type: "income",
      amount: 2500,
      currency: "USD",
      description: "Freelance Upwork",
      accountId: "acc2",
      createdAt: "2025-08-02T12:00:00Z",
      updatedAt: "2025-08-02T12:00:00Z",
    },
    {
      id: "t3",
      type: "transfer",
      amount: 500.32,
      currency: "ARS",
      description: "Transferencia a cuenta de ahorros",
      accountId: "acc1",
      targetAccountId: "acc3",
      createdAt: "2025-08-03T09:30:00Z",
      updatedAt: "2025-08-03T09:30:00Z",
    },
    {
      id: "t4",
      type: "currency_conversion",
      amount: 1030,
      currency: "USD",
      description: "Cambio de USD a ARS",
      accountId: "acc2",
      targetAccountId: "acc1",
      sourceCurrency: "USD",
      targetCurrency: "ARS",
      exchangeRate: 1350,
      createdAt: "2025-08-04T14:45:00Z",
      updatedAt: "2025-08-04T14:45:00Z",
    },
    {
      id: "t5",
      type: "expense",
      amount: 15,
      currency: "USD",
      description: "Spotify Premium",
      accountId: "acc2",
      suscription: true,
      createdAt: "2025-08-05T07:20:00Z",
      updatedAt: "2025-08-05T07:20:00Z",
    },
    {
      id: "t6",
      type: "income",
      amount: 180000,
      currency: "ARS",
      description: "Sueldo Agosto",
      accountId: "acc1",
      createdAt: "2025-08-06T09:00:00Z",
      updatedAt: "2025-08-06T09:00:00Z",
    },
    {
      id: "t7",
      type: "expense",
      amount: 25000,
      currency: "ARS",
      description: "Pago tarjeta VISA",
      accountId: "acc1",
      createdAt: "2025-08-07T18:15:00Z",
      updatedAt: "2025-08-07T18:15:00Z",
    },
    {
      id: "t8",
      type: "transfer",
      amount: 300,
      currency: "USD",
      description: "Envío a cuenta internacional",
      accountId: "acc2",
      targetAccountId: "acc4",
      createdAt: "2025-08-08T15:30:00Z",
      updatedAt: "2025-08-08T15:30:00Z",
    },
  ];

  const handleTransactionTypeStyle = (transactionType: TransactionType) => {
    switch (transactionType) {
      case "income":
      case "yield":
        return "text-positive";
      case "expense":
      case "credit_payment":
        return "text-negative";
      case "currency_conversion":
      case "transfer":
        return "text-neutral";
      default:
        return;
    }
  };

  const handleAmountSign = (transactionType: TransactionType) => {
    switch (transactionType) {
      case "income":
      case "yield":
        return "+";
      case "expense":
      case "credit_payment":
        return "-";
      case "currency_conversion":
      case "transfer":
        return "";
      default:
        return;
    }
  };

  const chartData = [
    { name: "Incomes", value: 44030 },
    { name: "Outcomes", value: 30530 },
  ];

  const COLORS = ["#16a34a", "#dc2626"];

  return (
    <Widget type={"transactions"} detailsButton>
      <div className="flex flex-col justify-between w-full h-full overflow-hidden">
        <div className="relative flex gap-2 mb-5 basis-[35%]">
          <div className="flex flex-6">
            <ResponsiveContainer width="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius="70%"
                  outerRadius="100%"
                  dataKey="value"
                  stroke="#272a33"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index]}
                      strokeWidth={1}
                      cursor={"pointer"}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-5">
            <div className="flex flex-col flex-1 justify-around items-center font-light text-sm">
              <div className="flex">
                <button className="bg-button hover:bg-button-hover shadow-lg shadow-shadow px-6 py-3 rounded-xl h-fit font-semibold text-white hover:scale-98 transition-all duration-300 hover:cursor-pointer">
                  Nueva Transaccion
                </button>
              </div>

              <div className="flex flex-col gap-2 pt-4 font-light text-xs`">
                <div
                  className={`flex flex-wrap items-center  ${
                    activeIndex === 0
                      ? "text-primary-light dark:text-primary-dark"
                      : "text-secondary-light dark:text-secondary-dark"
                  }`}
                >
                  <div className="inline-block bg-positive mr-2 w-3 h-3"></div>
                  <span className="mr-2 font-bold">Ingresos</span>
                  <span>$44.030,00</span>
                </div>

                <div
                  className={`flex flex-wrap items-center  ${
                    activeIndex === 1
                      ? "text-primary-light dark:text-primary-dark"
                      : "text-secondary-light dark:text-secondary-dark"
                  }`}
                >
                  <div className="inline-block bg-negative mr-2 w-3 h-3"></div>
                  <span className="mr-2 font-bold">Egresos</span>
                  <span>$30.530,35</span>
                </div>
                <div className="flex flex-wrap items-center">
                  <div className="inline-block mr-2 border-1 border-black dark:border-border-dark w-3 h-3"></div>
                  <span className="mr-2 font-bold text-secondary-light dark:text-secondary-dark">
                    Deficit
                  </span>
                  <span className="text-secondary-light dark:text-secondary-dark">
                    $30.530,35
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex pr-2 text-sm text-center">
          <span className="flex-1 py-2">Fecha</span>
          <span className="flex-4 py-2">Descripcion</span>
          <span className="flex-2 py-2">Cuenta</span>
          <span className="flex-2 py-2">Total</span>
          <span className="flex-1 py-2">Moneda</span>
        </div>
        <ScrollableContainer scrollY>
          <div className="flex flex-col pr-2 w-full text-sm text-center">
            {data.map((tx, i) => (
              <tr
                key={i}
                className="flex justify-start items-center border-t border-border-light dark:border-border-dark"
              >
                <td className="flex-1 py-2 text-primary-light dark:text-primary-dark">
                  {formatDateMMdd(DateTime.fromISO(tx.createdAt ?? ""))}
                </td>
                <td className="flex-4 py-2">{tx.description}</td>
                <td className="flex-2 py-2">{tx.accountId}</td>

                <td
                  className={`py-2 flex-2 ${handleTransactionTypeStyle(
                    tx.type
                  )}`}
                >
                  {handleAmountSign(tx.type)} ${tx.amount.toLocaleString()}
                </td>
                <td className="flex-1 py-2">{tx.currency}</td>
              </tr>
            ))}
          </div>
        </ScrollableContainer>
      </div>
    </Widget>
  );
};
