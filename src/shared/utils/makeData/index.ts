import { faker } from '@faker-js/faker';
import type {
  TDailyNews,
  TIndicator,
  TWarningPoint,
} from '~/shared/types/daily-news.type';
import type {
  TAlert,
  TDashboard,
  TDataUnknownProp,
  TShipment,
} from '~/shared/types/dashboard.type';
import type { TOperation } from '~/shared/types/operation.type';
import type { TRule } from '~/shared/types/rule.type';
import type { TTransactions } from '~/shared/types/transactions.type';
import type { TTreatedQueue } from '~/shared/types/treatment-queue.type';

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i += 1) {
    arr.push(i);
  }
  return arr;
};

function dashboardUnknown(quantity = 0) {
  const makeDataLevel = (): TDataUnknownProp[] =>
    range(quantity).map((i): TDataUnknownProp => {
      const map = new Map();
      map.set('0', 'Ativas');
      map.set('1', 'Pendentes');
      map.set('2', 'Rejeitadas');
      map.set('3', 'Impugnadas');
      map.set('4', 'Honradas');
      return {
        description: map.get(i) || '',
        quantity: faker.number.int({ min: 1, max: 2000 }),
        difference: `+${faker.number.int({ min: -10, max: 10 })}% vs ontem`,
      };
    });

  return makeDataLevel();
}

function dashboardAlerts(quantity = 0) {
  const makeDataLevel = (): TAlert[] =>
    range(quantity).map((): TAlert => {
      return {
        severity: faker.helpers.arrayElement(['low', 'medium', 'high']),
        description: faker.lorem.sentence(),
        date: faker.date.recent().toISOString(),
      };
    });

  return makeDataLevel();
}

function cpf() {
  return `***.***.${faker.number.int({ min: 200, max: 300 })}-**`;
}

function dashboardOperations(quantity = 0) {
  const makeDataLevel = (): TOperation[] =>
    range(quantity).map((): TOperation => {
      return {
        id: faker.string.uuid(),
        personId: cpf(),
        status: faker.helpers.arrayElement([
          'Rejeitada',
          'Pendente',
          'Impugnada',
        ]),
        reason: faker.helpers.arrayElement([
          'Divergência de valor',
          'Saldo não enviado',
          'Retorno inconsistente',
        ]),
        actionDescription: faker.helpers.arrayElement([
          'Corrigir e reenviar',
          'Enviar saldo',
          'Validar retorno',
        ]),
        impactValue: faker.number.int({ min: 1000, max: 15000 }),
        actionLimitDate: faker.date.future().toISOString(),
      };
    });

  return makeDataLevel();
}

function dashboardShipments(quantity = 0) {
  const makeDataLevel = (): TShipment[] =>
    range(quantity).map((): TShipment => {
      const errorsCount = faker.number.int({ min: 0, max: 10 });
      return {
        id: faker.string.uuid(),
        date: faker.date.recent().toISOString(),
        status: faker.helpers.arrayElement([
          'Processada',
          'Rejeitada',
          'Em análise',
        ]),
        registryCount: faker.number.int({ min: 1, max: 100 }),
        errorsCount: errorsCount,
      };
    });

  return makeDataLevel();
}

function treatmentQueue(quantity = 0) {
  const makeDataLevel = (): TTreatedQueue[] =>
    range(quantity).map((): TTreatedQueue => {
      return {
        id: faker.string.uuid(),
        personId: cpf(),
        status: faker.helpers.arrayElement([
          'Rejeitada',
          'Pendente',
          'Impugnada',
        ]),
        reason: faker.helpers.arrayElement([
          'Divergência de valor',
          'Saldo não enviado',
          'Retorno inconsistente',
        ]),
        actionDescription: faker.helpers.arrayElement([
          'Corrigir e reenviar',
          'Enviar saldo',
          'Validar retorno',
        ]),
        actionLimitDate: faker.date.future().toISOString(),
        impactValue: faker.number.int({ min: 1000, max: 15000 }),
        urgency: faker.helpers.arrayElement(['Crítico', 'Atenção', 'Normal']),
      };
    });

  return makeDataLevel();
}

function operations(quantity = 0) {
  const makeDataLevel = (): TOperation[] =>
    range(quantity).map((): TOperation => {
      const status = faker.helpers.arrayElement(['Rejeitada', 'Honrada']);
      return {
        id: `OP-${faker.number.int({ min: 1000, max: 5000 })}`,
        personId: cpf(),
        operationValue: faker.number.int({ min: 1000, max: 5000 }),
        status: status,
        reason: status === 'Rejeitada' ? 'Divergência de valor' : '-',
        actionDescription: status === 'Rejeitada' ? 'Corrigir e reenviar' : '-',
        shipmentId: `R${faker.number.int({ min: 100, max: 999 })}`,
        urgency: status === 'Rejeitada' ? 'Crítico' : 'Ok',
      };
    });

  return makeDataLevel();
}

function shipments(quantity = 0) {
  const makeDataLevel = (): TShipment[] =>
    range(quantity).map((): TShipment => {
      const status = faker.helpers.arrayElement([
        'Processada',
        'Rejeitada',
        'Em análise',
      ]);
      const registryCount = faker.number.int({ min: 1, max: 200 });
      return {
        id: `R${faker.number.int({ min: 100, max: 999 })}`,
        date: faker.date.recent().toISOString(),
        status: status,
        registryCount: registryCount,
        errorsCount:
          status === 'Processada'
            ? 0
            : faker.number.int({ min: 1, max: registryCount }),
      };
    });

  return makeDataLevel();
}

function operationForTransaction(quantity = 0) {
  const makeDataLevel = (): any[] =>
    range(quantity).map((): any => {
      const status = faker.helpers.arrayElement(['Divergente', 'Pago']);
      return {
        id: `OP-${faker.number.int({ min: 1000, max: 5000 })}`,
        type: faker.helpers.arrayElement(['Honra']),
        operationValue: faker.number.int({ min: 1000, max: 5000 }),
        status: status,
        conciliation: status === 'Pago' ? 'Conciliado' : 'Divergente',
        date: faker.date.recent().toISOString(),
      };
    });

  return makeDataLevel();
}

function transactions(quantity = 0): TTransactions {
  return {
    id: faker.string.uuid(),
    header: {
      expectedValue: faker.number.int({ min: 1000, max: 5000 }),
      expectedDiference: faker.number.int({ min: 100, max: 500 }),
      paidValue: faker.number.int({ min: 1000, max: 5000 }),
      paidValueDiference: faker.number.int({ min: 100, max: 500 }),
      divergenceValue: faker.number.int({ min: 100, max: 500 }),
      divergenceDiference: faker.number.int({ min: 100, max: 500 }),
      alertDescription: faker.lorem.sentence(),
      alertType: faker.helpers.arrayElement(['Info', 'Warning', 'Error']),
    },
    operations: operationForTransaction(quantity),
  };
}

function dashboard(): TDashboard {
  return {
    dataUnknown: dashboardUnknown(4),
    alerts: dashboardAlerts(4),
    operations: dashboardOperations(4),
    shipments: dashboardShipments(4),
  };
}

function indicators(): TIndicator[] {
  const cards = [
    'Limite FGO',
    'Limite Crepoc',
    'Valor Comprometido',
    'Saldo Honrado',
    'Risco de Limite',
  ];

  const indicators: TIndicator[] = [];
  for (let i = 0; i < cards.length; i++) {
    indicators.push({
      title: cards[i],
      description: `${faker.number.int({ min: 4, max: 40 })},0M`,
      subtitle: faker.helpers.arrayElement([
        'estável',
        `${faker.number.int({ min: 1, max: 10 })}%`,
        'atenção',
      ]),
      status: faker.helpers.arrayElement(['Crítico', 'Atenção', 'Ok']),
    });
  }

  return indicators;
}

function warningPoints(quantity = 0) {
  const makeDataLevel = (): TWarningPoint[] =>
    range(quantity).map((): TWarningPoint => {
      return {
        description: faker.lorem.sentence(),
        severity: faker.helpers.arrayElement(['Info', 'Warning', 'Error']),
      };
    });

  return makeDataLevel();
}

function dailyNews(): TDailyNews {
  return {
    indicators: indicators(),
    executiveReading: faker.lorem.sentence(),
    warningPoints: warningPoints(4),
  };
}

function rules(quantity = 0) {
  const makeDataLevel = (): TRule[] =>
    range(quantity).map((): TRule => {
      return {
        id: faker.string.uuid(),
        ruleCode: faker.number.int({ min: 100, max: 999 }).toString(),
        reason: faker.lorem.sentence(),
        category: faker.helpers.arrayElement([
          'Financeiro',
          'Saldo',
          'Remessa',
        ]),
        status: faker.helpers.arrayElement(['Activo', 'Inativo']),
        ruleDescription: faker.lorem.paragraph(),
        actionDescription: faker.lorem.paragraph(),
      };
    });

  return makeDataLevel();
}

function randomObject(keys: string[], quantity = 1) {
  return range(quantity).map((i): { [index: string]: string } => {
    let t = {};
    for (const key of keys) {
      t = { ...t, [key]: `${key}-${i}` };
    }
    return { ...t };
  });
}

export const makeData = {
  dashboard,
  randomObject,
  treatmentQueue,
  operations,
  shipments,
  transactions,
  dailyNews,
  rules,
};
