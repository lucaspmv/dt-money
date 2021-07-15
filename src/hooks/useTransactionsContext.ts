import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function useTransactionsContext() {
  const context = useContext(TransactionsContext);

  return context;
}