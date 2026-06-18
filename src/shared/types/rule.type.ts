export type TRuleRequest = {
  search?: string;
  category?: string;
  page: number;
  pageSize: number;
};

export type TRuleResponse = {
  data: TRule[];
  total: number;
};

export type TRule = {
  id: string;
  ruleCode: string;
  reason: string;
  category: string;
  status: string;
  //on click show props:
  ruleDescription: string;
  actionDescription: string;
};
