import type { CreditCardModel } from "../../models/CreditCardModel";
import { getBankGradient } from "../../utils/bankGradients";
import { FaEdit } from "react-icons/fa";
import { Tooltip } from "../Tooltip";
import { IoMdAdd, IoMdInformationCircleOutline } from "react-icons/io";
import { MdOutlineAddCircle } from "react-icons/md";
import { formatDateMMdd } from "../../utils/dateUtils";
import { DateTime } from "luxon";
import { useState } from "react";
import type { AccountType } from "../../types/AccountType";
import { RiAddLargeFill } from "react-icons/ri";
import { ScrollableContainer } from "../ScrollableContainer";

type CreditCardProps = {
  creditCard: CreditCardModel;
  isActive: boolean;
};
const chartData = {
  cardName: "Limit",
  limit: 2632,
  spent: 786,
};

type CreditViewType = "info" | "list";

export const CreditCard = (props: CreditCardProps) => {
  const { name, bankId, limit, closingDate, dueDate, balance } =
    props.creditCard;
  const [creditView, setCreditView] = useState<CreditViewType>("info");
  const [from, to] = getBankGradient(bankId);
  const percent = Math.min((chartData.spent / limit) * 100, 100);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {!props.isActive && (
        <div className="absolute bg-black/60 backdrop-blur-lg rounded-xl w-full h-full"></div>
      )}
      <div
        className="flex rounded-xl h-full text-white text-sm"
        style={{
          background: `linear-gradient(to bottom right, ${from}, ${to})`,
        }}
      >
        <div className="flex flex-col flex-grow px-4 py-2">
          <div className="flex gap-4 mr-6 text-sm">
            <button
              className={` hover:cursor-pointer text-primary-dark ${
                creditView === "info" ? "border-b-1 font-bold text-white" : ""
              }`}
              onClick={() => setCreditView("info")}
            >
              INFO
            </button>
            <button
              className={` hover:cursor-pointer text-primary-dark ${
                creditView === "list" ? "border-b-1 font-bold  text-white" : ""
              }`}
              onClick={() => setCreditView("list")}
            >
              DETALLE CUOTAS
            </button>
          </div>

          <div className="flex justify-between items-center gap-3 py-2">
            <span className="font-bold text-xl">{name}</span>
            <div className="flex items-center gap-4">
              <Tooltip text="Nuevo credito">
                <RiAddLargeFill className="w-5 h-5 hover:scale-110 hover:cursor-pointer" />
              </Tooltip>

              <Tooltip text="Editar informacion">
                <FaEdit className="w-5 h-5 hover:scale-110 hover:cursor-pointer" />
              </Tooltip>
            </div>
          </div>

          {creditView === "info" ? (
            <div className="flex flex-col flex-grow justify-around">
              <div className="flex flex-col font-medium">
                <span>Cierre:</span>
                {formatDateMMdd(DateTime.fromISO(closingDate) ?? "", true)}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <div className="flex flex-col flex-grow">
                    <span className="font-bold">Proximo pago:</span>
                    <span className="font-bold">
                      {formatDateMMdd(DateTime.fromISO(dueDate) ?? "", true)}
                    </span>
                  </div>
                  <div className="flex gap-3 text-lg">
                    <span className="font-bold">
                      ARS $
                      {balance
                        .filter((credit) => credit.currency === "ARS")
                        .reduce(
                          (acc, credit) => acc + credit.installmentValue,
                          0
                        )}
                    </span>
                    <span className="font-bold">
                      USD $
                      {balance
                        .filter((credit) => credit.currency === "USD")
                        .reduce(
                          (acc, credit) => acc + credit.installmentValue,
                          0
                        )}
                    </span>
                  </div>
                </div>
                <div className="flex bg-[#374151] my-auto rounded-full w-full h-3 overflow-hidden">
                  <div
                    className="bg-[#e5e7eb] h-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="flex justify-end gap-2 font-medium text-sm">
                  <span>Limite: $123.344</span>
                  <Tooltip
                    text={
                      "El limite es calculado en $ARS haciendo cambio a cotizacion del dia"
                    }
                  >
                    <IoMdInformationCircleOutline className="self-center w-5 h-5" />
                  </Tooltip>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full overflow-hidden">
              <div className="flex text-sm text-center">
                <span className="flex-1 py-2">Cuotas</span>
                <span className="flex-2 py-2">Descripcion</span>
                <span className="flex-1 py-2">Moneda</span>
                <span className="flex-1 py-2">Total</span>
              </div>
              <ScrollableContainer scrollY>
                <div className="flex flex-col pr-2 w-full text-sm text-center">
                  {balance
                    .sort(
                      (a, b) =>
                        b.remainingInstallments - a.remainingInstallments
                    )
                    .map((credit, i) => (
                      <tr
                        key={i}
                        className="flex justify-start items-center py-2 border-primary-dark border-t"
                      >
                        <td className="flex-1">
                          {credit.remainingInstallments}
                        </td>
                        <td className="flex-2">{credit.description}</td>
                        <td className="flex-1">{credit.currency}</td>
                        <td className="flex-1">{credit.installmentValue}</td>
                      </tr>
                    ))}
                </div>
              </ScrollableContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
