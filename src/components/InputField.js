import React from "react";

const InputField = ({ input, meta, label, placeholder }) => (
  <div>
    <label>{label}</label>
    <input {...input} type="text" placeholder={placeholder} />
    {meta.error && meta.touched && <span>{meta.error}</span>}
  </div>
);
export default InputField;
