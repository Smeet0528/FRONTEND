export type UserSigninInfo = {
  email: string;
  password: string;
};

function validateUser(values: UserSigninInfo) {
  const errors = { email: '', password: '' };

  const vaildateEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (!vaildateEmail.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  if (!(values.password.length >= 4)) {
    errors.password = '비밀번호는 4자 이상 입력해주세요.';
  }

  return errors;
}

export function validateSignIn(values: UserSigninInfo) {
  return validateUser(values);
}
