import React from "react";

const Input = (props) => {
  const { id, label, type, value, onChange } = props;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;