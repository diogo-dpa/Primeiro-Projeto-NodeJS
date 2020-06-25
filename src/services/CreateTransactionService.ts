import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request{
  title: string;
  value: number;
  type: 'income'|'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {

    // Using desctructuring
    const {total} = this.transactionsRepository.getBalance()

    // Validating values
    if(type === "outcome" && value > total){
      throw Error('Invalid transaction.')
    }

    // If there is no error, create the transaction
    const transaction = this.transactionsRepository.create({title, value, type} )

    return transaction;
  }
}

export default CreateTransactionService;
