import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { TDailyNews } from '~/shared/types/daily-news.type';
// import { useAxios } from '~/shared/hooks';
import { makeData } from '~/shared/utils';
import { delay } from '~/shared/utils/delay';

const KEY = 'daily-news';

export function useDailyNews() {
  // const { fetchData } = useAxios();
  const { data, isFetching, refetch } = useQuery<TDailyNews>({
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
        return makeData.dailyNews();

        return {} as TDailyNews;
      } catch (error) {
        console.log(`Error on fetching daily news data:`, error);
        return {} as TDailyNews;
      }
    },
    placeholderData: keepPreviousData,
  });
  const dailyNewsData = data || [];
  return { isFetching, dailyNewsData, refetch };
}
