import React from "react";
import { useFormikContext } from "formik";

interface ImageInputFieldProps {
  label: string;
  name: string;
  id?: string;
  error?: string;
}

const ImageInputField: React.FC<ImageInputFieldProps> = ({ label, name, id, error }) => {
  const { setFieldValue } = useFormikContext(); // Get Formik's setFieldValue

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue(name, file); // Set the file to Formik's state
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-1 block w-full text-sm text-gray-500"
      />
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default ImageInputField;
