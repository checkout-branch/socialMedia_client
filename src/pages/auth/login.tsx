// src/pages/auth/login.tsx

import AuthLayout from '@/layout/AuthLayout';
import LoginForm from '@components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
        <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
