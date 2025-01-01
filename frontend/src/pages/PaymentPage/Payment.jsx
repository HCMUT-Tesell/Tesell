import InfoShipping from "../../components/Payment/InfoShipping";
import OptionPayment from "../../components/Payment/OptionPayment";
import OptionShipping from "../../components/Payment/OptionShipping";
import OrderDetail from "../../components/Payment/OrderDetail";
import { useState, useContext } from 'react';
import { StoreContext } from "../../context/StoreContext";
import useFetchProducts from "../../hook/useFetchProducts";

const Payment = () => {
  const { orderDetailIds, confirmOrder, updateOrderStatus } = useContext(StoreContext);
  const [shippingFee, setShippingFee] = useState();
  // const [products, setProducts] = useState([]);
  const isAuthed = true;
  const products = useFetchProducts(orderDetailIds, isAuthed);
  return (
    <div className='justify-items-center flex flex-row p-12'>
      <div className=''>
        <InfoShipping onSubmit={(shippingData) => {confirmOrder(shippingData);}}/>
      </div>
      <div className='px-8 flex-col gap-4 '>
        <OptionShipping onShippingChange={setShippingFee} />
        <div className='mt-8'>
          <OptionPayment/>
        </div>
      </div>
        <div className=''>
          {/* <Cart isAuthed={true} orderDetailIds={orderDetailIds} updateOrderFunction={setProducts} /> */}
          <OrderDetail 
            products={products} 
            shippingFee={shippingFee} 
            onPlaceOrder={(totalPrice) => updateOrderStatus(totalPrice)}
          />
        </div>
    </div>

  )
}

export default Payment;
