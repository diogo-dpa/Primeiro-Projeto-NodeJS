import Transaction from '../models/Transaction';

// Create a DTO to help formating params in Create method
interface CreateTransactioDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {

    // Return the array
    return this.transactions;
  }

  public getBalance(): Balance {
    
    // sum the income values 
    const income = this.transactions.reduce( (acumulator, current) => current.type==="income"? 
                                                        acumulator + current.value: acumulator, 0);
    // sum the outcome values
    const outcome = this.transactions.reduce( (acumulator, current) => current.type==="outcome"? 
                                                        acumulator + current.value: acumulator, 0);
    // Solve the total
    const total = income - outcome;
    // Create an object to return
    const balance = {
      income,
      outcome,
      total
    }
    
    return balance;
  }

  public create({title, value, type}: CreateTransactioDTO): Transaction {
    
    // Before add the new transaction, it needed to valid it 
    const transaction = new Transaction({title, value, type})
    // Add the transaction into the array
    this.transactions.push(transaction)

    // return the new transaction
    return transaction;
  }
}

export default TransactionsRepository;
