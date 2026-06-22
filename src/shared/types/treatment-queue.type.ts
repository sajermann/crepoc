import type { TOperation } from './operation.type';

export type TTreatedQueueRequest = {
  search?: string;
  status?: string;
  urgency?: string;
  page: number;
  pageSize: number;
};

export type TTreatedQueueResponse = {
  data: TOperation[];
  total: number;
};
