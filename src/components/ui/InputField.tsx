
interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  type,
  placeholder,
  error,
  ...rest
}) => (
  <div className="form-group">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      {...rest}
      className={`mt-1 p-2 w-full border rounded-md bg-[#34363E] ${error ? 'border-red-500' : 'border-gray-300'}`}
    />
    {error && <div className="mt-1 text-sm text-red-500">{error}</div>}
  </div>
);

export default InputField;
