import React from "react";

const FormSection = ({ title, children, className = "" }) => {
  return (
    <div className={`box ${className}`}>
      {title && (
        <div className="box-header">
          <h5 className="box-title">{title}</h5>
        </div>
      )}
      <div className="box-body space-y-5">
        {children}
      </div>
    </div>
  );
};

export default FormSection;
