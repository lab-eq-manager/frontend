import { LoginForm } from '@/components/LoginForm';

export const LoginView = () => {
  return (
    <div className="login-wrapper flex flex-col items-center gap-8 w-full">
      <div className="title font-semibold text-2xl mb-20">Welcome!</div>
      <LoginForm />
    </div>
  );
};
