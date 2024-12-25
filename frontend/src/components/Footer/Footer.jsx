import React, { useState } from "react";

const CurrencyInput = () => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/\./g, ""); // Loại bỏ dấu chấm cũ
    if (!isNaN(rawValue)) { // Chỉ cho phép nhập số
      setValue(formatNumber(rawValue));
    }
  };

  const formatNumber = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Nhập số tiền"
        className="w-40 px-2 py-1 border rounded"
      />
    </div>
  );
};

export default CurrencyInput;