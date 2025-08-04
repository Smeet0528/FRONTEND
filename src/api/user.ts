import type {
  RequestSignInDto,
  RequestSignUpDto,
  ResponseSignInDto,
  ResponseSignUpDto,
} from '@/types/user';
import { axiosInstance } from './axios';

// 회원가입
export const signUp = async (
  body: RequestSignUpDto
): Promise<ResponseSignUpDto> => {
  const { data } = await axiosInstance.post(`/signup`, body);

  return data;
};

// 로그인
export const signIn = async (
  body: RequestSignInDto
): Promise<ResponseSignInDto> => {
  const { data } = await axiosInstance.post(`/signin`, body);

  return data;
};
