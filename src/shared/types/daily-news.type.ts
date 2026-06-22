export type TDailyNewsRequest = {
  referenceDate?: string;
};

export type TDailyNewsResponse = {
  data: TDailyNews[];
};

export type TDailyNews = {
  indicators: TIndicator[];
  executiveReading: string;
  warningPoints: TWarningPoint[];
};

export type TIndicator = {
  title: string;
  subtitle: string;
  description: string;
  status: string;
};

export type TWarningPoint = {
  description: string;
  severity: string;
};
