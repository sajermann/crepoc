export type TOperationRequest = {
  search?: string;
  status?: string;
  page: number;
  pageSize: number;
};

export type TOperationResponse = {
  data: TOperation[];
  total: number;
};

export type TOperation = {
  id: string;
  operationId: string;
  personId: string; // Cpf
  operationValue?: number;
  status: string;
  reason: string;
  actionDescription: string;
  shipmentId?: string;
  actionLimitDate?: string;
  impactValue?: number;
  urgency?: string;
};
