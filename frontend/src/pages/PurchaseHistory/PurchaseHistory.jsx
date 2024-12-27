import React from 'react'
import PurchaseHistoryNavbar from '../../components/PurchaseHistoryNavBar/PurchaseHistoryNavbar'
import HistoryCard from '../../components/HistoryCard/HistoryCard'
function PurchaseHistory() {
    const test = {
        dateOrdered: "2024-12-24T13:43:59.341+00:00", 
        status: "delivering", 
        orderId: "676abd113ef808f1436523f5", 
        totalPrice: 50000000, 
        images: [
            "https://cdn.tgdd.vn/Products/Images/42/327343/xiaomi-poco-m6-black-thumb-600x600.jpg",
            "https://cdn.tgdd.vn/Products/Images/42/320734/xiaomi-redmi-a3-xanh-l%C3%A1-thumb-600x600.jpg", 
            "https://cdn.tgdd.vn/Products/Images/42/328626/realme-c65s-blue-thumb-600x600.jpg",
            "https://cdn.tgdd.vn/Products/Images/7264/293603/q-q-c01a-007py-nu-thumb-fix-600x600.jpg"]
    }

    return (
        <div className='flex flex-col gap-3 items-center'>
            <PurchaseHistoryNavbar />
            <div className='flex flex-col gap-3 w-full items-center'>
                <HistoryCard dateOrdered={test.dateOrdered} images={test.images} orderId={test.orderId} status={test.status} totalPrice={test.totalPrice}/>
            </div>
        </div>
    )
}

export default PurchaseHistory