import type { DateTime } from "luxon";
import { Widget } from "./Widget";
import { ScrollableContainer } from "../ScrollableContainer";

interface BalanceWidgetProps {
  date: DateTime;
}

export const BalanceWidget = (props: BalanceWidgetProps) => {
  return (
    <Widget type={"balance"}>
      <ScrollableContainer scrollY>
        <div className="flex flex-col">
          <div className="text-primary-light dark:text-primary-dark text-sm">
            Disponible
          </div>
          <div className="flex flex-col 2xl:pt-2">
            <div className="font-bold text-primary-light dark:text-primary-dark text-lg md:text-2xl 2xl:text-4xl">
              ARS $11.350,89
            </div>
            <div className="flex gap-2 2xl:pt-4 font-light text-secondary-light dark:text-secondary-dark text-sm">
              <span>Reserva:</span>
              <span>ARS $42.321,53</span>
            </div>
          </div>
        </div>
      </ScrollableContainer>
    </Widget>
  );
};
