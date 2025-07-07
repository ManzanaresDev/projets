// components.inputField.jsx

import React, { forwardRef } from "react";

const InputField = forwardRef(({ label, type, value, onChange }, ref) => {
  const id = label.toLowerCase().replace(/\s+/g, "-"); // génère un id simple

  return (
    <div style={{ marginBottom: "1rem" }} className="task-form">
      <label htmlFor={id}>{label}</label>
      <br />
      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          style={{ width: "100%", padding: "0.5rem", minHeight: "100px" }}
          ref={ref}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          style={{ width: "100%", padding: "0.5rem" }}
          ref={ref}
        />
      )}
    </div>
  );
});

export default InputField;
