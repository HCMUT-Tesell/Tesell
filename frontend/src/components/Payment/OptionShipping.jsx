import { useState } from 'react';

const OptionShipping = () => {
  const [shippingMethod, setShippingMethod] = useState('store'); // Default: Nhận tại cửa hàng

  return (
    <div className="bg-blue-50 w-[390px] p-6 rounded-lg shadow-md shadow-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
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
              onChange={() => setShippingMethod('store')}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span>Nhận tại cửa hàng</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="shipping"
              value="fast"
              checked={shippingMethod === 'fast'}
              onChange={() => setShippingMethod('fast')}
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
