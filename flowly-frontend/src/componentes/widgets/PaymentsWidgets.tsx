import { Widget } from "./Widget";
import { type PaymentModel } from "../../models/PaymentModel";
import { DateTime } from "luxon";
import { ScrollableContainer } from "../ScrollableContainer";
import { Tooltip } from "../Tooltip";
import { SlOptionsVertical } from "react-icons/sl";
import { formatDateMMdd } from "../../utils/dateUtils";
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";

interface PaymentProps {
  date: DateTime;
  payments?: PaymentModel[];
}

const payments: PaymentModel[] = [
  {
    id: "1",
    title: "Visa Gold",
    amount: 12300,
    currency: "ARS",
    dueDate: "2025-08-01T10:15:00Z",
    status: "paid",
    category: "credit",
    description: "Monotributo",
  },
  {
    id: "2",
    title: "Netflix",
    amount: 3200,
    currency: "ARS",
    dueDate: "2025-08-21T10:15:00Z",
    status: "paid",
    category: "cash",
    description: "MercadoPago",
  },
  {
    id: "3",
    title: "Mercadopago",
    amount: 12300,
    currency: "ARS",
    dueDate: "2025-08-01T10:15:00Z",
    status: "pending",
    category: "credit",
    description: "Monotributo",
  },
  {
    id: "4",
    title: "Gas",
    amount: 3200,
    currency: "ARS",
    dueDate: "2025-08-01T10:15:00Z",
    status: "pending",
    category: "cash",
    description: "MercadoPago",
  },
  {
    id: "5",
    title: "Agua",
    amount: 12300.5,
    currency: "ARS",
    dueDate: "2025-08-31T10:15:00Z",
    status: "pending",
    category: "credit",
    description: "Monotributo",
  },
  {
    id: "6",
    title: "Internet",
    amount: 32200,
    currency: "ARS",
    dueDate: "2025-08-10T10:15:00Z",
    status: "pending",
    category: "cash",
    description: "MercadoPago",
  },
  {
    id: "7",
    title: "Tarjeta",
    amount: 3200,
    currency: "ARS",
    dueDate: "2025-08-14T10:15:00Z",
    status: "pending",
    category: "cash",
    description: "MercadoPago",
  },
  {
    id: "8",
    title: "Gimnasio",
    amount: 2399,
    currency: "ARS",
    dueDate: "2025-08-31T10:15:00Z",
    status: "paid",
    category: "credit",
    description: "Monotributo",
  },
  {
    id: "9",
    title: "Alquiler",
    amount: 82200,
    currency: "ARS",
    dueDate: "2025-08-10T10:15:00Z",
    status: "pending",
    category: "cash",
    description: "MercadoPago",
  },
];

const CHART_COLORS = ["#3b5dcf1a", "#2563eb"];

const paymentItem = (payment: PaymentModel, highlight = false) => {
  return (
    <div className="mr-2" key={payment.id}>
      <div
        key={payment.id}
        className={`flex py-1 border-b border-border-light dark:border-border-dark ${
          highlight ? "bg-highlight-payment font-medium" : ""
        }`}
      >
        <div className="flex items-center pl-2 w-full text-sm">
          <div className="flex flex-1">
            {formatDateMMdd(DateTime.fromISO(payment.dueDate ?? ""))}
          </div>
          <div className="flex flex-2">{payment.category}</div>
          <div className="flex flex-3">{payment.title}</div>
          <div className="flex flex-4 justify-between items-center gap-2 text-primary-light dark:text-primary-dark">
            <div className="pr-2">
              {payment.currency} ${payment.amount}
            </div>
            <div className="flex gap-2 h-full">
              <button
                className={` ${
                  highlight ? "bg-pay" : "bg-button"
                } hover:scale-98 transition-all duration-300 hover:bg-positive px-4 py-1 rounded-md text-md text-primary-lightdark dark:text-primary-dark cursor-pointer`}
              >
                <span>Pago</span>
              </button>
              <Tooltip text="Opciones">
                <div className="hover:bg-button-hover dark:hover:bg-button-hover p-2 rounded-md h-full cursor-pointer">
                  <SlOptionsVertical className="w-4" />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PaymentsWidgets = (props: PaymentProps) => {
  //Returns an object with the next payments grouped by date, and other list with near payments.
  const groupPaymentsByDate = (payments: PaymentModel[]) => {
    if (payments.length === 0) {
      return { nextPayments: [], nearPayments: [] };
    }

    const activePayments = payments.filter(
      (payment) => payment.status !== "paid"
    );

    const sorted = activePayments.sort(
      (a, b) =>
        DateTime.fromISO(a.dueDate ?? "").toMillis() -
        DateTime.fromISO(b.dueDate ?? "").toMillis()
    );

    const nextDate = new Date(sorted[0].dueDate).toISOString().split("T")[0];

    const nextPayments = sorted.filter(
      (p) => new Date(p.dueDate).toISOString().split("T")[0] === nextDate
    );

    const nearPayments = sorted.filter(
      (p) => new Date(p.dueDate).toISOString().split("T")[0] !== nextDate
    );

    return { nextPayments, nearPayments };
  };

  const chartData = () => {
    const monthlyDebt = payments
      .filter((payment) => payment.category !== "credit")
      .reduce((acc, payment) => acc + payment.amount, 0);

    const realized = payments
      .filter((payment) => payment.status === "paid")
      .reduce((acc, payment) => acc + payment.amount, 0);

    return [
      {
        name: "Monthly Debt",
        value: monthlyDebt - realized,
      },
      {
        name: "Realized payments",
        value: realized,
      },
    ];
  };

  return (
    <Widget type={"payments"} addButton detailsButton>
      <div className="flex h-full overflow-hidden">
        <div className="flex flex-col flex-2 h-full">
          <div className="flex pb-2 border-b-2 border-border-light dark:border-border-dark text-sm">
            <div className="flex-grow">Gastos fijos del mes:</div>
            <div className="flex gap-3">
              <span>ARS $12.5234,35</span>
              <span>USD $12.5234,35</span>
            </div>
          </div>
          <div className="flex py-2 pr-3 pl-2 text-sm">
            <span className="flex flex-1">Fecha</span>
            <span className="flex flex-2">Tipo</span>
            <span className="flex flex-3">Descripcion</span>
            <span className="flex flex-4">Total</span>
          </div>
          <ScrollableContainer scrollY={true}>
            <div className="flex flex-col pb-2">
              {groupPaymentsByDate(payments).nextPayments.map((payment) =>
                paymentItem(payment, true)
              )}
              {groupPaymentsByDate(payments).nearPayments.map((payment) =>
                paymentItem(payment)
              )}
            </div>
          </ScrollableContainer>
          {/* <div className="flex pt-2 border-t-2 border-border-light dark:border-border-dark text-sm">
            <div className="flex-grow">Gastos fijos del mes:</div>
            <div className="flex gap-3">
              <span>ARS $12.5234,35</span>
              <span>USD $12.5234,35</span>
            </div>
          </div> */}
        </div>
        <div className="flex flex-col flex-1 justify-end items-center gap-6">
          <ResponsiveContainer height="75%">
            <PieChart>
              <Pie
                data={chartData()}
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                dataKey="value"
                stroke="#272a33"
                startAngle={90}
                endAngle={450}
              >
                {chartData().map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index]}
                    stroke={"#272a33"}
                    strokeWidth={1}
                    cursor={"pointer"}
                  />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      const { cx, cy } = viewBox;
                      return (
                        <text
                          x={cx}
                          y={cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#fff"
                          fontSize={13}
                        >
                          <tspan x={cx} dy="-1em">
                            Realizado: $12.134,12
                          </tspan>
                          <tspan x={cx} dy="1.5em">
                            Pendiente: $91.011,09
                          </tspan>
                        </text>
                      );
                    }
                    return null;
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex gap-2 text-sm">
            <div className="flex flex-wrap items-center">
              <div className="inline-block bg-pay mr-2 w-3 h-3"></div>
              <span className="mr-2">Realizado</span>
            </div>

            <div className={`flex flex-wrap items-center `}>
              <div className="inline-block bg-highlight-payment mr-2 w-3 h-3"></div>
              <span className="mr-2">Pendiente</span>
            </div>
          </div>
        </div>
      </div>
    </Widget>
  );
};
