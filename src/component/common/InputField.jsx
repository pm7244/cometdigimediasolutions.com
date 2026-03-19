import React from "react";

const InputField = ({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder, 
  rows = 4,
  className = "",
  required = false 
}) => {
  return (
    <div className={className}>
      <label className="ti-form-label">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value || ""}
          onChange={onChange}
          className="ti-form-input"
          placeholder={placeholder}
          rows={rows}
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          className="ti-form-input"
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
};

export default InputField;
