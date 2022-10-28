import {format} from 'date-fns';
import {GatewayTransaction} from '@fortis/api/src/services/gateway-transactions.service';
import {RecurringTransactionsForecast} from '@fortis/api/src/services/recurring-transactions-forecast.service';
import {RecurringTransactionsHistory} from '@fortis/api/src/services/recurring-transactions-history.service';
import {SettledTransaction} from '@fortis/api/src/services/settled-transactions.service';

export type Value = {
  id: 'auth' | 'refund' | 'sale' | 'paid' | 'unpaid' | 'recurring';
  values: [number, number][]; // [count, amount]
};

export type PeriodId =
  | 'last24hours'
  | 'last48hours'
  | 'last72hours'
  | 'last30days'
  | 'last12months'
  | 'next30days'
  | 'next12months';

export type TransactionsGatewaysCollection = {
  id: PeriodId;
  scale: 'hours';
  metrics: ('transactions' | 'amount')[];
  range: number[]; // timestamp
  values: Value[];
}[];

export const convertTransactionsGatewaysCollection = (
  period_: PeriodId,
  transactionsGatewaysCollection: GatewayTransaction[],
) => {
  const period = transactionsGatewaysCollection.find(transaction => {
    return transaction.id === period_;
  });

  const unProcessedValues = period?.range.map((timestamp, idx) => {
    let Sales = {amount: 0, transactions: 0};
    let Refunds = {amount: 0, transactions: 0};
    let Auths = {amount: 0, transactions: 0};

    [...Array(3).keys()].forEach(k => {
      const type = period?.values[k].id;

      const [transactions, amount] = period?.values[k].values[idx];

      if (type === 'sale') {
        Sales.amount = Sales.amount + amount;
        Sales.transactions = Sales.transactions + transactions;
      } else if (type === 'refund') {
        Refunds.amount = Refunds.amount + amount;
        Refunds.transactions = Refunds.transactions + transactions;
      } else if (type === 'auth') {
        Auths.amount = Auths.amount + amount;
        Auths.transactions = Auths.transactions + transactions;
      }
    });

    return {
      Sales,
      Auths,
      Refunds,
      date: new Date(timestamp * 1000),
    };
  });

  // Combine results
  const combinedUnprocessedValues: any[] = [];
  let counter = 0;
  if (unProcessedValues) {
    combinedUnprocessedValues.push(unProcessedValues[0]);
    counter = 1;
  }

  for (let i = 1; unProcessedValues && i < unProcessedValues?.length; i += 1) {
    if (unProcessedValues[i].date === unProcessedValues[i - 1].date) {
      unProcessedValues[counter].Auths.amount =
        unProcessedValues[i].Auths.amount;
      unProcessedValues[counter].Auths.transactions =
        unProcessedValues[i].Auths.transactions;

      unProcessedValues[counter].Refunds.amount =
        unProcessedValues[i].Refunds.amount;
      unProcessedValues[counter].Refunds.transactions =
        unProcessedValues[i].Refunds.transactions;

      unProcessedValues[counter].Sales.amount =
        unProcessedValues[i].Sales.amount;
      unProcessedValues[counter].Sales.transactions =
        unProcessedValues[i].Sales.transactions;
    } else {
      combinedUnprocessedValues.push(unProcessedValues[i]);
      counter += 1;
    }
  }

  let hours: number[] = [];
  if (period_ === 'last24hours') {
    hours = [6, 12, 18, 24];
  } else if (period_ === 'last48hours') {
    hours = [12, 24, 36, 48];
  } else if (period_ === 'last72hours') {
    hours = [18, 36, 54, 72];
  }

  const processedData: {
    labels: string[][];
    values: {
      Sales: {amount: number; transactions: number};
      Auths: {amount: number; transactions: number};
      'Returns / Refunds': {amount: number; transactions: number};
    }[];
  } = {labels: [], values: []};

  const referenceDate = new Date();
  referenceDate.setMinutes(0);
  referenceDate.setSeconds(0);
  referenceDate.setMilliseconds(0);

  hours.forEach((time, idx3) => {
    let Sales = {amount: 0, transactions: 0};
    let Refunds = {amount: 0, transactions: 0};
    let Auths = {amount: 0, transactions: 0};

    for (
      let i = 0;
      combinedUnprocessedValues.length && i < combinedUnprocessedValues?.length;
      i += 1
    ) {
      const value = combinedUnprocessedValues[i];

      const calculatedTime =
        (referenceDate.getTime() - value.date.getTime()) / 3600000;

      if (calculatedTime < time) {
        Sales.amount =
          Math.round((Sales.amount + value.Sales.amount) * 100) / 100;
        Sales.transactions = Sales.transactions + value.Sales.transactions;

        Refunds.amount =
          Math.round((Refunds.amount + value.Refunds.amount) * 100) / 100;
        Refunds.transactions =
          Refunds.transactions + value.Refunds.transactions;

        Auths.amount =
          Math.round((Auths.amount + value.Auths.amount) * 100) / 100;
        Auths.transactions = Auths.transactions + value.Auths.transactions;

        combinedUnprocessedValues.splice(i, 1);
        i -= 1;
      }
    }

    processedData.values.push({
      Sales,
      Auths,
      'Returns / Refunds': Refunds,
    });

    // const keyDate = new Date(referenceDate.getTime() - time * 3600000);

    const difference = idx3 === 0 ? 0 : hours[idx3 - 1];

    const initialDate = new Date();
    initialDate.setHours(referenceDate.getHours() - difference);

    processedData.labels.push([
      `${format(initialDate, 'haaa')}`,
      `${format(initialDate, 'LL/dd')}`,
    ]);
  });

  return processedData;
};

export const calculateTransactionsGatewaysTotals = (
  period_: PeriodId,
  transactionsGatewaysCollection: GatewayTransaction[],
) => {
  const period = transactionsGatewaysCollection.find(transaction => {
    return transaction.id === period_;
  });

  const unProcessedValues = period?.range.map((timestamp, idx) => {
    let Total = {amount: 0, transactions: 0};

    [...Array(3).keys()].forEach(k => {
      const [transactions, amount] = period?.values[k].values[idx];

      Total.amount = Total.amount + amount;
      Total.transactions = Total.transactions + transactions;
    });

    return {
      Total,
      date: new Date(timestamp * 1000),
    };
  });

  const globalTotal = {amount: 0, transactions: 0};
  if (unProcessedValues) {
    unProcessedValues.forEach(value => {
      globalTotal.amount = globalTotal.amount + value.Total.amount;
      globalTotal.transactions =
        globalTotal.transactions + value.Total.transactions;
    });
    globalTotal.amount = Math.round(globalTotal.amount * 100) / 100;

    return globalTotal;
  }
  return;
};

export const convertTransactions = (
  period_: PeriodId,
  transactionsGatewaysCollection: SettledTransaction[],
) => {
  const period = transactionsGatewaysCollection.find(transaction => {
    return transaction.id === period_;
  });

  const unProcessedValues = period?.range.map((timestamp, idx) => {
    let Sales = {amount: 0, transactions: 0};

    const type = period?.values[0].id;

    const [transactions, amount] = period?.values[0].values[idx];

    if (type === 'sale') {
      Sales.amount = Sales.amount + amount;
      Sales.transactions = Sales.transactions + transactions;
    }

    return {
      Sales,
      date: new Date(timestamp * 1000),
    };
  });

  // Combine results
  const combinedUnprocessedValues: any[] = [];
  let counter = 0;
  if (unProcessedValues) {
    combinedUnprocessedValues.push(unProcessedValues[0]);
    counter = 1;
  }

  for (let i = 1; unProcessedValues && i < unProcessedValues?.length; i += 1) {
    if (unProcessedValues[i].date === unProcessedValues[i - 1].date) {
      unProcessedValues[counter].Sales.amount =
        unProcessedValues[i].Sales.amount;
      unProcessedValues[counter].Sales.transactions =
        unProcessedValues[i].Sales.transactions;
    } else {
      combinedUnprocessedValues.push(unProcessedValues[i]);
      counter += 1;
    }
  }

  let days: number[] = [];
  let months: number[] = [];
  if (period_ === 'last30days') {
    days = [10, 20, 30];
  } else if (period_ === 'last12months') {
    months = [3, 6, 9, 12];
  }

  const processedData: {
    labels: string[][];
    values: {
      Sales: {amount: number; transactions: number};
    }[];
  } = {labels: [], values: []};

  const referenceDate = new Date();
  referenceDate.setHours(0);
  referenceDate.setMinutes(0);
  referenceDate.setSeconds(0);
  referenceDate.setMilliseconds(0);

  if (months.length > 0) {
    referenceDate.setDate(1);
    referenceDate.setMonth(referenceDate.getMonth() - 1);
  }

  if (days.length > 0) {
    days.forEach((time, idx3) => {
      let Sales = {amount: 0, transactions: 0};

      for (
        let i = 0;
        combinedUnprocessedValues.length &&
        i < combinedUnprocessedValues?.length;
        i += 1
      ) {
        const value = combinedUnprocessedValues[i];

        const calculatedTime =
          (referenceDate.getTime() - value.date.getTime()) / 86400000;

        if (calculatedTime < time) {
          Sales.amount =
            Math.round((Sales.amount + value.Sales.amount) * 100) / 100;
          Sales.transactions = Sales.transactions + value.Sales.transactions;

          combinedUnprocessedValues.splice(i, 1);
          i -= 1;
        }
      }

      processedData.values.push({
        Sales,
      });

      const keyDate = new Date(referenceDate.getTime() - time * 86400000);

      const difference = idx3 === 0 ? 0 : days[idx3 - 1];

      const initialDate = new Date();
      initialDate.setDate(referenceDate.getDate() - difference);

      processedData.labels.push([
        `${format(initialDate, 'LL/dd')} -`,
        `${format(keyDate, 'LL/dd')}`,
      ]);
    });
  }

  if (months.length > 0) {
    const monthDiff = (dateFrom: Date, dateTo: Date) => {
      return (
        dateTo.getMonth() -
        dateFrom.getMonth() +
        12 * (dateTo.getFullYear() - dateFrom.getFullYear())
      );
    };

    months.forEach((time, timeIndex) => {
      let Sales = {amount: 0, transactions: 0};

      for (
        let i = 0;
        combinedUnprocessedValues.length &&
        i < combinedUnprocessedValues?.length;
        i += 1
      ) {
        const value = combinedUnprocessedValues[i];

        const monthDifference = Math.abs(monthDiff(referenceDate, value.date));
        if (monthDifference < time) {
          Sales.amount =
            Math.round((Sales.amount + value.Sales.amount) * 100) / 100;
          Sales.transactions = Sales.transactions + value.Sales.transactions;

          combinedUnprocessedValues.splice(i, 1);
          i -= 1;
        }
      }

      processedData.values.push({
        Sales,
      });

      const initialDate = new Date(referenceDate);
      const timeDiff = timeIndex === 0 ? 0 : months[timeIndex - 1];
      initialDate.setMonth(referenceDate.getMonth() - timeDiff);

      const p1 = format(initialDate, 'LLL');

      const previousDate2 = new Date(initialDate);
      previousDate2.setMonth(previousDate2.getMonth() - 1);
      const p2 = format(previousDate2, 'LLL');

      const previousDate3 = new Date(initialDate);
      previousDate3.setMonth(previousDate3.getMonth() - 2);
      const p3 = format(previousDate3, 'LLL');

      processedData.labels.push([`${p1}/${p2}`, `${p3}`]);
    });
  }

  return processedData;
};

export const convertRecurringTransactionsHistory = (
  period_: PeriodId,
  transactionsGatewaysCollection: RecurringTransactionsHistory[],
) => {
  const period = transactionsGatewaysCollection.find(transaction => {
    return transaction.id === period_;
  });

  const unProcessedValues = period?.range.map((timestamp, idx) => {
    let Paid = {amount: 0, transactions: 0};
    let Unpaid = {amount: 0, transactions: 0};

    [...Array(2).keys()].forEach(k => {
      const type = period?.values[k].id;

      const [transactions, amount] = period?.values[k].values[idx];

      if (type === 'paid') {
        Paid.amount = Paid.amount + amount;
        Paid.transactions = Paid.transactions + transactions;
      } else if (type === 'unpaid') {
        Unpaid.amount = Unpaid.amount + amount;
        Unpaid.transactions = Unpaid.transactions + transactions;
      }
    });

    return {
      Paid,
      Unpaid,
      date: new Date(timestamp * 1000),
    };
  });

  // Combine results
  const combinedUnprocessedValues: any[] = [];
  let counter = 0;
  if (unProcessedValues) {
    combinedUnprocessedValues.push(unProcessedValues[0]);
    counter = 1;
  }

  for (let i = 1; unProcessedValues && i < unProcessedValues?.length; i += 1) {
    if (unProcessedValues[i].date === unProcessedValues[i - 1].date) {
      unProcessedValues[counter].Paid.amount = unProcessedValues[i].Paid.amount;
      unProcessedValues[counter].Paid.transactions =
        unProcessedValues[i].Paid.transactions;

      unProcessedValues[counter].Unpaid.amount =
        unProcessedValues[i].Unpaid.amount;
      unProcessedValues[counter].Unpaid.transactions =
        unProcessedValues[i].Unpaid.transactions;
    } else {
      combinedUnprocessedValues.push(unProcessedValues[i]);
      counter += 1;
    }
  }

  let days: number[] = [];
  let months: number[] = [];
  if (period_ === 'last30days') {
    days = [10, 20, 30];
  } else if (period_ === 'last12months') {
    months = [3, 6, 9, 12];
  }

  const processedData: {
    labels: string[][];
    values: {
      Paid: {amount: number; transactions: number};
      Unpaid: {amount: number; transactions: number};
    }[];
  } = {labels: [], values: []};

  const referenceDate = new Date();
  referenceDate.setHours(0);
  referenceDate.setMinutes(0);
  referenceDate.setSeconds(0);
  referenceDate.setMilliseconds(0);

  if (months.length > 0) {
    referenceDate.setDate(1);
    referenceDate.setMonth(referenceDate.getMonth() - 1);
  }

  if (days.length > 0) {
    days.forEach((time, idx3) => {
      let Paid = {amount: 0, transactions: 0};
      let Unpaid = {amount: 0, transactions: 0};

      for (
        let i = 0;
        combinedUnprocessedValues.length &&
        i < combinedUnprocessedValues?.length;
        i += 1
      ) {
        const value = combinedUnprocessedValues[i];

        if (
          (referenceDate.getTime() - value.date.getTime()) / 86400000 <
          time
        ) {
          Paid.amount =
            Math.round((Paid.amount + value.Paid.amount) * 100) / 100;
          Paid.transactions = Paid.transactions + value.Paid.transactions;

          Unpaid.amount =
            Math.round((Unpaid.amount + value.Unpaid.amount) * 100) / 100;
          Unpaid.transactions = Unpaid.transactions + value.Unpaid.transactions;

          combinedUnprocessedValues.splice(i, 1);
          i -= 1;
        }
      }

      processedData.values.push({
        Paid,
        Unpaid,
      });

      const keyDate = new Date(referenceDate.getTime() - time * 86400000);

      const difference = idx3 === 0 ? 0 : days[idx3 - 1];

      const initialDate = new Date();
      initialDate.setDate(referenceDate.getDate() - difference);

      processedData.labels.push([
        `${format(initialDate, 'LL/dd')} -`,
        `${format(keyDate, 'LL/dd')}`,
      ]);
    });
  }

  if (months.length > 0) {
    const monthDiff = (dateFrom: Date, dateTo: Date) => {
      return (
        dateTo.getMonth() -
        dateFrom.getMonth() +
        12 * (dateTo.getFullYear() - dateFrom.getFullYear())
      );
    };

    months.forEach((time, timeIndex) => {
      let Paid = {amount: 0, transactions: 0};
      let Unpaid = {amount: 0, transactions: 0};

      for (
        let i = 0;
        combinedUnprocessedValues.length &&
        i < combinedUnprocessedValues?.length;
        i += 1
      ) {
        const value = combinedUnprocessedValues[i];

        const monthDifference = Math.abs(monthDiff(referenceDate, value.date));
        if (monthDifference < time) {
          Paid.amount =
            Math.round((Paid.amount + value.Paid.amount) * 100) / 100;
          Paid.transactions = Paid.transactions + value.Paid.transactions;

          Unpaid.amount =
            Math.round((Unpaid.amount + value.Unpaid.amount) * 100) / 100;
          Unpaid.transactions = Unpaid.transactions + value.Unpaid.transactions;

          combinedUnprocessedValues.splice(i, 1);
          i -= 1;
        }
      }

      processedData.values.push({
        Paid,
        Unpaid,
      });

      const initialDate = new Date(referenceDate);
      const timeDiff = timeIndex === 0 ? 0 : months[timeIndex - 1];
      initialDate.setMonth(referenceDate.getMonth() - timeDiff);

      const p1 = format(initialDate, 'LLL');

      const previousDate2 = new Date(initialDate);
      previousDate2.setMonth(previousDate2.getMonth() - 1);
      const p2 = format(previousDate2, 'LLL');

      const previousDate3 = new Date(initialDate);
      previousDate3.setMonth(previousDate3.getMonth() - 2);
      const p3 = format(previousDate3, 'LLL');

      processedData.labels.push([`${p1}/${p2}`, `${p3}`]);
    });
  }

  return processedData;
};

export const convertRecurringTransactionsForecast = (
  period_: PeriodId,
  transactionsGatewaysCollection: RecurringTransactionsForecast[],
) => {
  const period = transactionsGatewaysCollection.find(transaction => {
    return transaction.id === period_;
  });

  const unProcessedValues = period?.range.map((timestamp, idx) => {
    let Sales = {amount: 0, transactions: 0};

    const type = period?.values[0].id;

    const [transactions, amount] = period?.values[0].values[idx];

    if (type === 'recurring') {
      Sales.amount = Sales.amount + amount;
      Sales.transactions = Sales.transactions + transactions;
    }

    return {
      Sales,
      date: new Date(timestamp * 1000),
    };
  });

  // Combine results
  const combinedUnprocessedValues: any[] = [];
  let counter = 0;
  if (unProcessedValues) {
    combinedUnprocessedValues.push(unProcessedValues[0]);
    counter = 1;
  }

  for (let i = 1; unProcessedValues && i < unProcessedValues?.length; i += 1) {
    if (unProcessedValues[i].date === unProcessedValues[i - 1].date) {
      unProcessedValues[counter].Sales.amount =
        unProcessedValues[i].Sales.amount;
      unProcessedValues[counter].Sales.transactions =
        unProcessedValues[i].Sales.transactions;
    } else {
      combinedUnprocessedValues.push(unProcessedValues[i]);
      counter += 1;
    }
  }

  let days: number[] = [];
  if (period_ === 'next30days') {
    days = [7, 15, 22, 30];
  } else if (period_ === 'next12months') {
    days = [91, 182, 273, 365];
  }

  const processedData: {
    labels: string[][];
    values: {
      Sales: {amount: number; transactions: number};
    }[];
  } = {labels: [], values: []};

  const referenceDate = new Date();
  referenceDate.setHours(0);
  referenceDate.setMinutes(0);
  referenceDate.setSeconds(0);
  referenceDate.setMilliseconds(0);

  days.forEach((time, idx3) => {
    let Sales = {amount: 0, transactions: 0};

    for (
      let i = 0;
      combinedUnprocessedValues.length && i < combinedUnprocessedValues?.length;
      i += 1
    ) {
      const value = combinedUnprocessedValues[i];

      if ((value.date.getTime() - referenceDate.getTime()) / 86400000 <= time) {
        Sales.amount =
          Math.round((Sales.amount + value.Sales.amount) * 100) / 100;

        Sales.transactions = Sales.transactions + value.Sales.transactions;
        combinedUnprocessedValues.splice(i, 1);
        i -= 1;
      }
    }

    processedData.values.push({
      Sales,
    });

    const keyDate = new Date(referenceDate.getTime() + time * 86400000);

    const difference = idx3 === 0 ? 0 : days[idx3 - 1];

    const initialDate = new Date();
    initialDate.setDate(referenceDate.getDate() + difference);

    processedData.labels.push([
      `${format(initialDate, 'LL/dd')} -`,
      `${format(keyDate, 'LL/dd')}`,
    ]);
  });

  return processedData;
};

export const calculateTransactionsTotals = (
  period_: PeriodId,
  transactionsGatewaysCollection:
    | GatewayTransaction[]
    | RecurringTransactionsForecast[],
) => {
  const period = transactionsGatewaysCollection.find(transaction => {
    return transaction.id === period_;
  });

  const unProcessedValues = period?.range.map((timestamp, idx) => {
    let Total = {amount: 0, transactions: 0};

    const [transactions, amount] = period?.values[0].values[idx];

    Total.amount = Total.amount + amount;
    Total.transactions = Total.transactions + transactions;

    return {
      Total,
      date: new Date(timestamp * 1000),
    };
  });

  const globalTotal = {amount: 0, transactions: 0};
  if (unProcessedValues) {
    unProcessedValues.forEach(value => {
      globalTotal.amount = globalTotal.amount + value.Total.amount;
      globalTotal.transactions =
        globalTotal.transactions + value.Total.transactions;
    });
    globalTotal.amount = Math.round(globalTotal.amount * 100) / 100;

    return globalTotal;
  }
  return;
};

export const calculateTransactionsHistoryTotals = (
  period_: PeriodId,
  transactionsGatewaysCollection:
    | GatewayTransaction[]
    | RecurringTransactionsForecast[],
) => {
  const period = transactionsGatewaysCollection.find(transaction => {
    return transaction.id === period_;
  });

  const unProcessedValues = period?.range.map((timestamp, idx) => {
    let Total = {amount: 0, transactions: 0};

    [...Array(2).keys()].forEach(k => {
      const [transactions, amount] = period?.values[k].values[idx];

      Total.amount = Total.amount + amount;
      Total.transactions = Total.transactions + transactions;
    });

    return {
      Total,
      date: new Date(timestamp * 1000),
    };
  });

  const globalTotal = {amount: 0, transactions: 0};
  if (unProcessedValues) {
    unProcessedValues.forEach(value => {
      globalTotal.amount = globalTotal.amount + value.Total.amount;
      globalTotal.transactions =
        globalTotal.transactions + value.Total.transactions;
    });
    globalTotal.amount = Math.round(globalTotal.amount * 100) / 100;

    return globalTotal;
  }
  return;
};
