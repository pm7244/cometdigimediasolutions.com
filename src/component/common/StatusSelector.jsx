import React from "react";
import Select from "react-select";

const StatusSelector = ({ value, onChange, label = "Status" }) => {
  return (
    <div className="box">
      <div className="box-header">
        <h5 className="box-title">{label}</h5>
      </div>
      <div className="box-body">
        <Select
          value={{
            value: value,
            label: value === 1 ? "Enable" : "Disable"
          }}
          options={[
            { value: 1, label: "Enable" },
            { value: 0, label: "Disable" },
          ]}
          onChange={(selected) => onChange(selected.value)}
        />
      </div>
    </div>
  );
};

export default StatusSelector;
