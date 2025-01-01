import { formatCurrency } from '../CartItem';

const OrderItem = ({ productName, imageUrl, quantity, sellPrice }) => {
  return (
    <div className="flex justify-between items-center border-b pb-4 mb-4">
      <div className="flex items-center gap-3">
        <img src={imageUrl} alt={productName} className="w-12 h-12 md:w-[100px] md:h-[100px] object-scale-down rounded-md" />
        <div>
          <h3 className="font-bold text-lg">{productName}</h3>
          <p className="text-gray-500">Số lượng: {quantity}</p>
          <p className="text-gray-500">Đơn giá: {formatCurrency(sellPrice)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;