import { useState } from 'react';

const OptionShipping = ({ onShippingChange }) => {
  const [shippingMethod, setShippingMethod] = useState('store'); // Default: Nhận tại cửa hàng
  const handleChange = (method) => {
    setShippingMethod(method);
    onShippingChange(method === "store" ? 0 : 50000);
  };
  return (
    <div className="bg-blue-50 w-[390px] p-6 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      {/* Vận chuyển */}
      <div>
        <h2 className="text-lg font-bold mb-4">Vận chuyển</h2>
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="shipping"
              value="store"
              checked={shippingMethod === 'store'}
              onChange={() => handleChange("store")}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span>Nhận tại cửa hàng</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="shipping"
              value="express"
              checked={shippingMethod === 'express'}
              onChange={() => handleChange("express")}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span>Giao hàng nhanh (dự kiến 1-2 ngày) 50.000</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default OptionShipping;
