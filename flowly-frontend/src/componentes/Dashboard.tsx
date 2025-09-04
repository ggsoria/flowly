import TopBar from "./TopBar";
import { AccountsWidget } from "./widgets/AccountsWidget";
import { BalanceWidget } from "./widgets/BalanceWidget";
import { DateTime } from "luxon";
import { TransactionsWidget } from "./widgets/TransactionsWidget";
import { CreditWidget } from "./widgets/CreditWidget";
import { PaymentsWidgets } from "./widgets/PaymentsWidgets";

export const Dashboard = () => {
  const actualDate = DateTime.now();

  return (
    <section
      aria-labelledby="dashboard-container"
      className="flex flex-col flex-1 gap-2 pl-4 min-h-0"
    >
      <header className="flex-shrink-0 border-1 border-border-light dark:border-border-dark rounded-lg">
        <TopBar date={actualDate} />
      </header>

      <div className="flex flex-row gap-4 min-h-0">
        <section className="flex flex-col gap-2 min-h-0 basis-[35%]">
          <div className="flex-1 min-h-0">
            <BalanceWidget date={actualDate} />
          </div>
          <div className="flex-3 min-h-0">
            <TransactionsWidget date={actualDate} />
          </div>
        </section>

        <section className="flex flex-col gap-2 min-h-0 basis-[65%]">
          <div className="flex flex-1 gap-4 min-h-0">
            <div className="flex-1 rounded-lg min-h-0">
              <AccountsWidget />
            </div>
            <div className="flex-1 rounded-lg min-h-0">
              <CreditWidget />
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <PaymentsWidgets date={actualDate} />
          </div>
        </section>
      </div>
    </section>
  );
};
