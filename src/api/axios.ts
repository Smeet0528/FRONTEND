import type { ResponseRefreshTokenDto } from '@/types/user';
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; //요청 재시도 여부를 나타내는 플래그
}

//전역 변수로 refresh 요청의 promise를 저장해서 중복 요청을 방지
let refreshPromise: Promise<string | void> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 요청 인터셉터: 요청 전에 accessToken을 Auhorization 헤더에 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    //수정된 요청 설정을 반환
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// 응답 인터셉터: refresh 토근을 통한 토큰 갱신을 처리
axiosInstance.interceptors.response.use(
  (response) => response, //정상 응답 발생 시 그대로 반환

  async (error: AxiosError) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;

    //401에러면서 아직 재시도하지않는 요청 경우 처리
    if (
      error &&
      error.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      // 401 에러 발생 시, 중복 시도 방지를 위해 로그아웃 처리
      if (originalRequest.url === '/reissue') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      //이미 리프레시 요청이 진행중이면, 그 promise를 재사용
      if (!refreshPromise) {
        // refresh 요청 실행
        refreshPromise = (async () => {
          const { data } = await axios.post<ResponseRefreshTokenDto>(
            `reissue`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
              },
            }
          );

          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('accessToken', data.refreshToken);

          //새 accessToken을 반환하여 다른 요청에서 사용
          return data.accessToken;
        })()
          .catch((error) => {
            console.log('refresh failed...', error);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      return refreshPromise.then((newAccessToken) => {
        // newAccessToken이 string인지 확인
        if (typeof newAccessToken === 'string') {
          //원본 요청의 Authorization 헤더를 갱신된 토큰으로 업데이트
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          //업데이트된 원본 요청을 재시도
          return axiosInstance.request(originalRequest);
        } else {
          // 토큰이 없으면 에러 반환
          return Promise.reject(new Error('Failed to refresh access token'));
        }
      });
    }
    // 401 이외의 에러일 경우 에러 반환
    return Promise.reject(error);
  }
);
