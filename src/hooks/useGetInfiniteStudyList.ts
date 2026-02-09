import { getTotalStudyList } from '@/api/list';
import {
  useInfiniteQuery,
  type QueryFunctionContext,
} from '@tanstack/react-query';

function useGetInfiniteNotiList() {
  return useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({
      pageParam,
    }: QueryFunctionContext<string[], number | undefined>) =>
      getTotalStudyList(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    retry: 1,
  });
}

export default useGetInfiniteNotiList;
