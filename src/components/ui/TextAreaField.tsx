import React from "react";

interface TextAreaFieldProps {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
  error?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  id,
  name,
  placeholder = "",
  error,
}) => (
  <div className="form-group">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      className={`mt-1 p-2 w-full border rounded-md bg-[#34363E] ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
    {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
  </div>
);

export default TextAreaField;
