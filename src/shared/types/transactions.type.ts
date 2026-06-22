export type TTransactionsRequest = {
  search?: string;
  type?: string;
  conciliation?: string;
  page: number;
  pageSize: number;
};

export type TTransactionsResponse = {
  data: TTransactions[];
  total: number;
};

export type TOperationForTransactions = {
  id: string;
  type: string;
  operationValue: number;
  status: string;
  conciliation: string;
  date: string;
};

export type TTransactions = {
  id: string;
  header: {
    expectedValue: number;
    expectedDiference: number;
    paidValue: number;
    paidValueDiference: number;
    divergenceValue: number;
    divergenceDiference: number;
    alertDescription: string;
    alertType: string;
  };
  operations: TOperationForTransactions[];
};
