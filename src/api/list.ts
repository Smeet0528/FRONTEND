import type {
  ResponseMyStudyList,
  ResponseTotoalStudyList,
} from '@/types/list';
import { axiosInstance } from './axios';

// 내 모임 리스트
export const getMyStudyList = async (): Promise<ResponseMyStudyList> => {
  const { data } = await axiosInstance.get(`/groups/my`);

  return data;
};

// 전체 모임 리스트
export const getTotalStudyList = async (
  cursor: number | undefined
): Promise<ResponseTotoalStudyList> => {
  const { data } = await axiosInstance.get(`/groups`, {
    params: { cursor },
  });

  return data;
};
