import { IoMdAdd } from "react-icons/io";
import { BiDetail } from "react-icons/bi";
import type { WidgetModel } from "../../models/WidgetModel";
import { capitalizeFirstLetter } from "../../utils/utils";
import { Toggle } from "../Toggle";
import { Tooltip } from "../Tooltip";
import type { WidgetType } from "../../types/WigetType";

export const WidgetTopHeader = (props: WidgetModel) => {
  const handleIconsHelp = (type: WidgetType) => {
    switch (type) {
      case "accounts":
        return "cuentas";
      case "credit":
        return "credito";
      case "payments":
        return "pago";
      case "transactions":
        return "transacciones";
      case "balance":
        return "balance";
      default:
        return "";
    }
  };
  return (
    <div className="flex items-center mb-4">
      <div className="flex-grow h-fit font-light text-base">
        {props.type === "payments"
          ? "Proximos Pagos"
          : capitalizeFirstLetter(handleIconsHelp(props.type))}
      </div>
      {props.addButton && (
        <Tooltip text={`Nuevo ${handleIconsHelp(props.type)}`}>
          <div className="flex">
            <button className="h-fit" onClick={props.onAddClick}>
              <IoMdAdd className="ml-2 w-5 h-5 text-secondary-light hover:text-primary-light dark:hover:text-primary-dark dark:text-secondary-dark hover:cursor-pointer" />
            </button>
          </div>
        </Tooltip>
      )}
      {props.currencyButton && (
        <div className="flex">
          <Tooltip text={`Display USD currency`}>
            <Toggle
              size={"sm"}
              label={{
                r: "",
                l: "USD",
              }}
            />
          </Tooltip>
        </div>
      )}
      {props.detailsButton && (
        <Tooltip text="Ver detalles">
          <div className="flex">
            <button className="h-fit" onClick={props.onDetailsClick}>
              <BiDetail className="ml-2 w-5 h-5 text-secondary-light hover:text-primary-light dark:hover:text-primary-dark dark:text-secondary-dark hover:cursor-pointer" />
            </button>
          </div>
        </Tooltip>
      )}
    </div>
  );
};
