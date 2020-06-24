import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;

    const calcBalance = (obj: Transaction[], type: string): number => {
      return obj.reduce((acc: number, transaction: Transaction): number => {
        if (transaction.type === type) {
          acc += transaction.value;
        }
        return acc;
      }, 0);
    };

    const income = calcBalance(transactions, 'income');
    const outcome = calcBalance(transactions, 'outcome');
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
