/* eslint-disable react/no-unescaped-entities */
'use client';
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { registerApi } from '@/service/auth';
import Button from './Button/Button';
import { toast } from 'react-toastify';

// Define the interface
interface RegistrationFormValues {
  userName: string;
  email: string;
  password: string;
  gender: string;
  day: string;
  month: string;
  year: string;
}

// Validation schema
const validationSchema = Yup.object({
  userName: Yup.string().required('UserName required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
  gender: Yup.string().required('Gender is required'),
  day: Yup.string().required('Day is required'),
  month: Yup.string().required('Month is required'),
  year: Yup.string().required('Year is required'),
});

const RegistrationForm: React.FC = () => {
  const router = useRouter();

  const initialValues: RegistrationFormValues = {
    userName: '',
    email: '',
    password: '',
    gender: '',
    day: '',
    month: '',
    year: '',
  };

  const handleSubmit = async (values: RegistrationFormValues) => {
    try {
      // Call the register API
      const response = await registerApi(values);
      
      // After successful registration, redirect to otp verification page
      if (response?.success) {
        router.push(`/auth/otp?email=${encodeURIComponent(values.email)}`);
        toast.success(response?.message)
      } else {
        // Handle API failure or errors
        toast.warn(response?.message)

      }
    } catch (error) {
      toast.error('Something went wrong')
      console.log(error)
    }
  };

  // Generate dropdown options
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December',
  ];
  const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Let's Learn More About You</h1>
        <p className="text-gray-400 text-sm">Please fill out the form below to help us know you better. Your information will help us provide you with a personalized experience.</p>
      </div>
      <div className="w-full max-w-sm mx-auto">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              {/* Username */}
              <div>
                <label className="block mb-1 text-white">Name</label>
                <Field
                  type="text"
                  name="userName"
                  className="w-full p-2 rounded-md bg-[#1a1c26] text-sm text-gray-400 h-10"
                  placeholder="Please Enter a Username"
                />
                <div className="text-red-500">
                  <ErrorMessage name="userName" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 text-white">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-2 rounded-md bg-[#1a1c26] text-sm text-gray-400 h-10"
                  placeholder="Please Enter your Email"
                />
                <div className="text-red-500">
                  <ErrorMessage name="email" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block mb-1 text-white">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full p-2 rounded-md bg-[#1a1c26] text-sm text-gray-400 h-10"
                  placeholder="Create a Password"
                />
                <div className="text-red-500">
                  <ErrorMessage name="password" />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block mb-1 text-white">Gender</label>
                <Field
                  as="select"
                  name="gender"
                  className="w-full p-2 rounded-md bg-[#1a1c26] text-gray-400 text-sm h-10"
                >
                  <option value="" label="Select gender" />
                  <option value="male" label="Male" />
                  <option value="female" label="Female" />
                </Field>
                <div className="text-red-500">
                  <ErrorMessage name="gender" />
                </div>
              </div>

              {/* Birthday */}
              <div>
                <label className="block mb-1 text-white">Birthday</label>
                <div className="flex space-x-2">
                  {/* Day */}
                  <Field
                    as="select"
                    name="day"
                    className="w-full p-2 rounded-md bg-[#1a1c26] text-gray-400 text-sm h-10"
                  >
                    <option value="" label="Day" />
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </Field>
                  {/* Month */}
                  <Field
                    as="select"
                    name="month"
                    className="w-full p-2 rounded-md bg-[#1a1c26] text-gray-400 h-10"
                  >
                    <option value="" label="Month" />
                    {months.map((month, index) => (
                      <option key={index} value={month}>
                        {month}
                      </option>
                    ))}
                  </Field>
                  {/* Year */}
                  <Field
                    as="select"
                    name="year"
                    className="w-full p-2 rounded-md bg-[#1a1c26] text-gray-400 h-10"
                  >
                    <option value="" label="Year" />
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="text-red-500">
                  <ErrorMessage name="day" />
                  <ErrorMessage name="month" />
                  <ErrorMessage name="year" />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                text='Get OTP'
              />
              <p className="text-center text-sm text-gray-400 mt-4">
                Already have an account?{' '}
                <a
                  href="/auth/login"
                  className="text-blue-500 hover:underline"
                >
                  Login
                </a>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationForm;
