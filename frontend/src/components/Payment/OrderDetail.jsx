import { formatCurrency } from '../CartItem';
import OrderItem from './OrderItem';
import { useNavigate } from 'react-router-dom';

const OrderDetail = ({ products = [], shippingFee = 0, onPlaceOrder}) => {
  const navigate = useNavigate();
  let totalPrice = 0;
  if (!products.length) {
    return <div>Không có sản phẩm trong đơn hàng.</div>;
  };

  const handlePlaceOrder = async () => {
    const totalOrderPrice = totalPrice + shippingFee;
    const isOrderPlaced = await onPlaceOrder(totalOrderPrice);
    if (isOrderPlaced) {
      navigate(`/success-payment`);
    }
  };

  return (
    <div className="bg-blue-50 w-[500px] p-6 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Đơn hàng</h2>
        <span className="text-gray-600 text-sm">{products.length} sản phẩm</span>
      </div>
      <div className="space-y-4">
        {products.map(([productInfo, quantity], index) => {
          const subtotal = productInfo.sellPrice * quantity;
          totalPrice += subtotal;

          return (
            <OrderItem
              key={index}
              productName={productInfo.productName}
              imageUrl={productInfo.imageUrl}
              quantity={quantity}
              sellPrice={productInfo.sellPrice}
            />
          );
        })}
      </div>
      <div className="pt-4 mt-4">
        <div className="flex justify-between mb-2">
          <span>Tạm tính</span>
          <span className="font-bold text-blue-500">{formatCurrency(totalPrice)} ₫</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Vận chuyển</span>
          <span className="font-bold text-blue-500">{formatCurrency(shippingFee)} ₫</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span className="">Tổng cộng</span>
          <span className="text-[#FF0A0A]">{formatCurrency(totalPrice + shippingFee)} ₫</span>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={() => navigate(`/`)} className="text-blue-500 underline">Quay về giỏ hàng</button>
        <button onClick={handlePlaceOrder} className="bg-blue-500 text-white py-2 px-4 rounded-md flex items-center gap-2">
          Đặt hàng <span>➡️</span>
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
