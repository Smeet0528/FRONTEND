import UseForm from '@/hooks/useForm';
import { validateSignIn } from '@/utils/validate';
import { Link } from 'react-router';

export default function LoginPage() {
  const { values, errors, touched, getInputProps } = UseForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateSignIn,
  });

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-30 h-30 bg-gray-300 mb-19"></div>

      <form className="w-full flex flex-col gap-3 px-6" onSubmit={handleSubmit}>
        <label htmlFor="email" className="sr-only">
          이메일
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="w-full max-w-[480px] h-12 px-3 bg-white border border-[#ABABAB] rounded-lg font-[pretendard] font-normal"
          {...getInputProps('email')}
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <label htmlFor="password" className="sr-only">
          비밀번호
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="w-full max-w-[480px] h-12 px-3 bg-white border border-[#ABABAB] rounded-lg font-[pretendard] font-normal"
          {...getInputProps('password')}
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <button
          type="submit"
          className="w-full max-w-[480px] h-12 px-3 rounded-lg bg-[#FA7D71] shadow-lg font-[pretendard] font-semibold text-white text-lg disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
          disabled={isDisabled}
        >
          로그인
        </button>
      </form>

      <div className="flex gap-6 mt-3">
        <p className="font-[pretendard] font-normal">아직 회원이 아니신가요?</p>
        <Link
          to={'/register'}
          className="font-[pretendard] font-semibold underline"
        >
          회원가입 하기
        </Link>
      </div>
    </div>
  );
}
