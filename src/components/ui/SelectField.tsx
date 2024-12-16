import React from "react";

interface SelectFieldProps {
  label: string;
  id: string;
  name: string;
  options: string[];
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  placeholder?: string;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  name,
  options,
  value,
  onChange,
  placeholder,
  error,
}) => (
  <div className="form-group">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`mt-1 p-2 w-full border rounded-md bg-[#34363E] ${error ? 'border-red-500' : 'border-gray-300'}`}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
  </div>
);

export default SelectField;
