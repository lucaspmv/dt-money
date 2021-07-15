import { createContext, useState, useEffect, ReactNode } from 'react';

import { api } from '../services/api';

type Transaction = {
  id: number,
  title: string,
  type: string,
  category: string,
  amount: number,
  createdAt: string,
}

type TransactionsContextProviderProps = {
  children: ReactNode,
}

type TransactionContextType = {
  transactions: Transaction[],
  createTransaction: (transaction: TransactionInput) => void,
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

export const TransactionsContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

export function TransactionsContextProvider({ children }: TransactionsContextProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransaction(transaction: TransactionInput) {

    await api.post('/transactions', transaction);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}