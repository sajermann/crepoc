import type { TOperation } from './operation.type';

export type TDashboard = {
  dataUnknown: TDataUnknownProp[];
  alerts: TAlert[];
  operations: TOperation[]; // Remessas para Agir Agora
  shipments: TShipment[];
};

export type TShipment = {
  id: string;
  shipmentId: string;
  date: string;
  status: string;
  registryCount: number;
  errorsCount: number;
};

export type TAlert = {
  severity: string;
  description: string;
  date: string;
};

export type TDataUnknownProp = {
  description: string;
  quantity: number;
  difference: string;
};
