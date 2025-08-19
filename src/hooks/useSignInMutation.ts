import { signIn } from '@/api/user';
import { useAuthStore } from '@/store/user';
import type { RequestSignInDto } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export default function useSignInMutation({
  onErrorCallback,
}: {
  onErrorCallback: () => void;
}) {
  const navigate = useNavigate();
  const login = useAuthStore((store) => store.login);

  return useMutation({
    mutationFn: (signinData: RequestSignInDto) => signIn(signinData),
    onSuccess: async (data) => {
      localStorage.setItem('accessToken', data.token.accessToken);
      localStorage.setItem('refreshToken', data.token.refreshToken);

      login(data.token.accessToken, data.nickname);
      await navigate('/');
    },
    onError: (error) => {
      console.error(error);
      onErrorCallback?.();
    },
  });
}
