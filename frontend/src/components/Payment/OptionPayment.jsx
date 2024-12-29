import { useState } from 'react';

const OptionPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState('cod'); // Default: Thanh toán khi nhận hàng

  return (
    <div className="bg-blue-50 w-[390px] p-6 rounded-lg shadow-md shadow-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      {/* Thanh toán */}
        <h2 className="text-lg font-bold mb-4">Thanh toán</h2>
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span>Thanh toán khi nhận hàng</span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={() => setPaymentMethod('bank')}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span>Chuyển khoản ngân hàng</span>
          </label>
        </div>
    </div>
  );
};

export default OptionPayment;