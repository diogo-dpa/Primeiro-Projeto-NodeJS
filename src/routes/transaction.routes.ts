import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

// Realiza a instância do repositório
const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // TODO

    const transactions = transactionsRepository.all()
    const balance = transactionsRepository.getBalance()

    const resultBalance = {
      transactions,
      balance
    }

    return response.json(resultBalance)

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {

    const {title, value, type} = request.body;

    const createTransaction = new CreateTransactionService(transactionsRepository);
    const transaction = createTransaction.execute({title, value, type})

    return response.json(transaction)

    // TODO
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
