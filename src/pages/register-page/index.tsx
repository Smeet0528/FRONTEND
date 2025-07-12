import UseForm from '@/hooks/useForm';
import { validateSignUp } from '@/utils/validate';

export default function RegisterPage() {
  const { values, errors, touched, getInputProps } = UseForm({
    initialValue: {
      email: '',
      password: '',
      nickname: '',
    },
    validate: validateSignUp,
  });

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === '');

  return (
    <div className="w-full max-w-[480px] flex flex-col items-center mt-20">
      <form className="w-full max-w-[480px]">
        <div className="flex flex-col gap-4 px-6">
          <label htmlFor="email" className="font-[pretendard] font-medium">
            이메일을 작성해주세요
            <span className="text-[#FF2323]" aria-hidden="true">
              *
            </span>
          </label>
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="w-full max-w-[480px] h-12 px-3 bg-white border border-[#ABABAB] rounded-lg font-[pretendard] font-normal"
            {...getInputProps('email')}
          />
          {errors?.email && touched?.email && (
            <div className="text-sm text-[#FF2323]">{errors.email}</div>
          )}

          <label htmlFor="password" className="font-[pretendard] font-medium">
            비밀번호를 작성해주세요
            <span className="text-[#FF2323]" aria-hidden="true">
              *
            </span>
          </label>
          <input
            required
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full max-w-[480px] h-12 px-3 bg-white border border-[#ABABAB] rounded-lg font-[pretendard] font-normal"
            {...getInputProps('password')}
          />
          {errors?.password && touched?.password && (
            <div className="text-sm text-[#FF2323]">{errors.password}</div>
          )}

          <label htmlFor="nickname" className="font-[pretendard] font-medium">
            닉네임을 작성해주세요
            <span className="text-[#FF2323]" aria-hidden="true">
              *
            </span>
          </label>
          <input
            required
            type="text"
            name="nickname"
            id="nickname"
            placeholder="Nickname"
            className="w-full max-w-[480px] h-12 px-3 bg-white border border-[#ABABAB] rounded-lg font-[pretendard] font-normal"
            {...getInputProps('nickname')}
          />
          {errors?.nickname && touched?.nickname && (
            <div className="text-sm text-[#FF2323]">{errors.nickname}</div>
          )}
        </div>

        <div className="fixed max-w-[480px] bottom-0 w-full pb-8 px-6">
          <button
            type="submit"
            className="w-full max-w-[480px] h-12 rounded-lg bg-[#FA7D71] shadow-lg font-[pretendard] font-semibold text-white text-lg disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
            disabled={isDisabled}
          >
            완료
          </button>
        </div>
      </form>
    </div>
  );
}
