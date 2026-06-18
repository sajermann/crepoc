export type TOperationDetailRequest = {
  search?: string;
  status?: string;
  page: number;
  pageSize: number;
};

export type TOperationDetailResponse = {
  data: TOperationDetail[];
  total: number;
};

export type TOperationDetail = {
  id: string;
  status: string;
  reason: string;
  actionDescription: string;
  impactValue: number;
  actionLimitDate: string;
  timeLine: TTimeline[];
  personId: string; // Cpf
  personName: string;
  operationValue: number;
  bankName: string;
  bankAgency: string;
  bankAccount: string;
  shipmentId: string;
  diagnostic: TDiagnostic;
};

type TDiagnostic = {
  code: string;
  attemptCount: number;
  description: string;
};

type TTimeline = {
  title: string;
  description: string;
  date: string;
  status: string;
};
