'use client'
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

interface LoginFormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
});

const LoginForm: React.FC = () => {
  const router = useRouter()
  const initialValues: LoginFormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async(values: LoginFormValues) => {
      try {
        const response = axios.post('http://localhost:5005/api/user/register')
        console.log(response);
        router.push('/auth/login')
        
      } catch (error) {
        alert('something error to register')
      }
  };

  return (
    <div className="w-full max-w-sm mx-auto ">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-4">

            <div>
              <Field
                type="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Email"
              />
              <div className="text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>

            <div>
              <Field
                type="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Password"
              />
              <div className="text-red-500">
                <ErrorMessage name="password" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-md"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
