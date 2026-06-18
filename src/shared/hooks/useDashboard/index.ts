import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import { useAxios } from '~/shared/hooks';
import type { TDashboard } from '~/shared/types/dashboard.type';
import { makeData } from '~/shared/utils';
import { delay } from '~/shared/utils/delay';

const KEY = 'dashboard';

export function useDashboard() {
  // const { fetchData } = useAxios();
  const { data, isFetching, refetch } = useQuery<TDashboard>({
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
        return makeData.dashboard();

        return {} as TDashboard;
      } catch (error) {
        console.log(`Error on fetching dashboard data:`, error);
        return {} as TDashboard;
      }
    },
    placeholderData: keepPreviousData,
  });
  const dashboardData = data || {
    dataUnknown: [],
    alerts: [],
    operations: [],
    shipments: [],
  };
  return { isFetching, dashboardData, refetch };
}
