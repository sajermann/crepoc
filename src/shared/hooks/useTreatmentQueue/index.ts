import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { TOperation } from '~/shared/types/operation.type';
// import { useAxios } from '~/shared/hooks';
import { makeData } from '~/shared/utils';
import { delay } from '~/shared/utils/delay';

const KEY = 'treatment-queue';

export function useTreatmentQueue() {
  // const { fetchData } = useAxios();
  const { data, isFetching, refetch } = useQuery<TOperation[]>({
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
        return makeData.treatmentQueue(5);

        return [];
      } catch (error) {
        console.log(`Error on fetching treatment queue data:`, error);
        return [];
      }
    },
    placeholderData: keepPreviousData,
  });
  const treatmentQueueData = data || [];
  return { isFetching, treatmentQueueData, refetch };
}
