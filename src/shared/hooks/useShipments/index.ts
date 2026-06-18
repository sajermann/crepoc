import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { TShipment } from '~/shared/types/dashboard.type';
// import { useAxios } from '~/shared/hooks';
import { makeData } from '~/shared/utils';
import { delay } from '~/shared/utils/delay';

const KEY = 'shipments';

export function useShipments() {
  // const { fetchData } = useAxios();
  const { data, isFetching, refetch } = useQuery<TShipment[]>({
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
        return makeData.shipments(5);

        return [];
      } catch (error) {
        console.log(`Error on fetching shipments data:`, error);
        return [];
      }
    },
    placeholderData: keepPreviousData,
  });
  const shipmentsData = data || [];
  return { isFetching, shipmentsData, refetch };
}
