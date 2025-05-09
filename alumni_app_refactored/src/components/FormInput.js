import React from "react";

const FormInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-darkslategray-100 text-smi mb-1 font-roboto"
        >
          {label}
          {required && <span className="text-red-100 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-3 py-2 bg-white border rounded-3xs focus:outline-none focus:ring-1 focus:ring-darkslategray-100 font-roboto text-smi
          ${error ? "border-red-100 focus:ring-red-100" : "border-gainsboro-100"}`}
        {...props}
      />
      {error && <p className="text-red-100 text-3xs mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;