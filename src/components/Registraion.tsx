
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface LoginFormValues {
  image:string;
  userName:string;
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  userName: Yup.string().required('UserName required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
});

const RegistrationForm: React.FC = () => {
  const initialValues: LoginFormValues = {
    image:'',
    userName:'',
    email: '',
    password: '',
  };

  const handleSubmit = (values: LoginFormValues) => {
    console.log(values); // Submit form values
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
                type="text"
                name="userName"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="UserName"
              />
              <div className="text-red-500">
                <ErrorMessage name="userName" />
              </div>
            </div>
            
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

export default RegistrationForm;
