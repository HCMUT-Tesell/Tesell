import InfoShipping from "../../components/Payment/InfoShipping";
import OrderSummary from "../../components/Payment/Order";
import OptionPayment from "../../components/Payment/OptionPayment";
import OptionShipping from "../../components/Payment/OptionShipping";

const Payment = () => {
  return (
    <div className='flex flex-col'>
      <div className='p-8 flex w-full flex-row gap-4'>
        <InfoShipping/>
        <div className='ml-4 flex flex-col h-full gap-4'>
          <OptionShipping/>
          <OptionPayment className='w-[500px]'/>
        </div>
        <div className='flex w-full h-full gap-4'>
          <OrderSummary/>
        </div>
      </div>
    </div>

  )
}

export default Payment;
