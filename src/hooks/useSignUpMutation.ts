import { signUp } from '@/api/user';
import type { RequestSignUpDto } from '@/types/user';
import { useMutation } from '@tanstack/react-query';

export default function useSignUpMutation({
  onSuccessCallback,
  onErrorCallback,
}: {
  onSuccessCallback: () => void;
  onErrorCallback: () => void;
}) {
  return useMutation({
    mutationFn: (signupData: RequestSignUpDto) => signUp(signupData),
    onSuccess: () => {
      onSuccessCallback?.();
    },
    onError: (error) => {
      console.error(error);
      onErrorCallback?.();
    },
  });
}
