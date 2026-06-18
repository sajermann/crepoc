export type TShipmentAndReturnRequest = {
  status?: string;
  page: number;
  pageSize: number;
};

export type TShipmentAndReturnResponse = {
  data: TShipmentAndReturn[];
  total: number;
};

export type TShipmentAndReturn = {
  id: string;
  date: string;
  status: string;
  registryCount: number;
  errorsCount: number;
  //on click show props:
  header: string;
  trailer: string;
};
