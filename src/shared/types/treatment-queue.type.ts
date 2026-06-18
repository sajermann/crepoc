export type TTreatedQueueRequest = {
  search?: string;
  status?: string;
  urgency?: string;
  page: number;
  pageSize: number;
};

export type TTreatedQueueResponse = {
  data: TTreatedQueue[];
  total: number;
};

export type TTreatedQueue = {
  id: string;
  personId: string; // Cpf
  status: string;
  reason: string;
  actionDescription: string;
  actionLimitDate: string;
  impactValue: number;
  urgency: string;
};
