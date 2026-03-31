// 회원가입 요청
export type RequestSignUpDto = {
  email: string;
  password: string;
  nickname: string;
};

// 회원가입 응답
export type ResponseSignUpDto = {
  message: string;
  email: string;
  nickname: string;
};

// 리프레시 토큰 응답
export type ResponseRefreshTokenDto = {
  grantType: 'Bearer';
  accessToken: string;
  refreshToken: string;
};

// 로그인 요청
export type RequestSignInDto = {
  email: string;
  password: string;
};

// 로그인 응답
export type ResponseSignInDto = {
  message: string;
  email: string;
  nickname: string;
  token: ResponseRefreshTokenDto;
};
