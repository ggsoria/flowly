export interface Balance {
  currency: string;
  accounts: Array<{
    name: string;
    amount: number;
    currency: string;
  }>;
  income: number;
  expenses: number;
  savings: number;
  investments: number;
  debts: number;
  netWorth: number;
  goals: Array<{
    name: string;
    targetAmount: number;
    currentAmount: number;
    dueDate: Date;
  }>;
  recentTransactions: Array<{
    id: string;
    date: Date;
    description: string;
    amount: number;
    currency: string;
    category: string;
    accountName: string;
  }>;
}
