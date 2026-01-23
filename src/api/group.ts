import { axiosInstance } from './axios';

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
