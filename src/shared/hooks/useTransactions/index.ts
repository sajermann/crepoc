import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { useAxios } from '~/shared/hooks';
import type { TTransactions } from '~/shared/types/transactions.type';
import { makeData } from '~/shared/utils';
import { delay } from '~/shared/utils/delay';

const KEY = 'dashboard';

export function useTransactions() {
  // const { fetchData } = useAxios();
  const { data, isFetching, refetch } = useQuery<TTransactions>({
    queryKey: [KEY],
    queryFn: async () => {
      try {
        // Comentado porque não temos backend
        // const result = await fetchData({
        //   method: 'get',
        //   url: `v1/dashboard`,
        // });
        // if (result?.status === 200) {
        //   return result.data;
        // }

        await delay(1000); // Simulate delay of 1 second to show loading
        return makeData.transactions(5);

        return {} as TTransactions;
      } catch (error) {
        console.log(`Error on fetching transactions data:`, error);
        return {} as TTransactions;
      }
    },
    placeholderData: keepPreviousData,
  });
  const transactionsData = data || [];
  return { isFetching, transactionsData, refetch };
}
