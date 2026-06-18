import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { TRule } from '~/shared/types/rule.type';
// import { useAxios } from '~/shared/hooks';
import { makeData } from '~/shared/utils';
import { delay } from '~/shared/utils/delay';

const KEY = 'rules';

export function useRules() {
  // const { fetchData } = useAxios();
  const { data, isFetching, refetch } = useQuery<TRule[]>({
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
        return makeData.rules(5);

        return [];
      } catch (error) {
        console.log(`Error on fetching rules data:`, error);
        return [];
      }
    },
    placeholderData: keepPreviousData,
  });
  const rulesData = data || [];
  return { isFetching, rulesData, refetch };
}
