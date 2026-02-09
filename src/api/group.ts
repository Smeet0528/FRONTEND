import { axiosInstance } from './axios';
import type { GroupDetailResponse } from '@/types/group';

import type {
  RequestCreateGroupDto,
  ResponseCreateGroupDto,
} from '@/types/group';

//모임생성 api
export const createGroup = async (
  body: RequestCreateGroupDto
): Promise<ResponseCreateGroupDto> => {
  const { data } = await axiosInstance.post(`/groups`, body);
  return data;
};

//모잉 상세조회 api
export const getGroupDetail = async (
  id: string
): Promise<GroupDetailResponse> => {
  const { data } = await axiosInstance.get(`/groups/${id}`);
  return data;
};