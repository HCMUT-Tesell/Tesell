// import React from 'react'
import { useParams  } from 'react-router-dom'
import PurchaseHistoryNavbar from '../../components/PurchaseHistoryNavBar/PurchaseHistoryNavbar'
import UserInfo from './UserInfo'
import ProductCard from './ProductCard'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


const PurchaseHistoryDetail = () => {
    const { orderId } = useParams()

    const getYear = (ISO_Date) => {
        return ISO_Date.substr(0, 4);
    }

    const getMonth = (ISO_Date) => {
        return ISO_Date.substr(5, 2);
    }

    const getDay = (ISO_Date) => {
        return ISO_Date.substr(8, 2);
    }

    const getTime = (ISO_Date) => {
        return ISO_Date.substr(11, 5);
    }

    const getStatus = (status) => {
        if (status == 'confirmed') return "Đã xác nhận";
        else if (status == 'exported') return "Đã xuất hàng";
        else if (status == 'delivering') return "Đang giao hàng";
        else if (status == 'delivered') return "Giao hàng thành công";
    }

    const formatCurrency = (number) => {
        return number.toLocaleString().replaceAll(",", ".");
    }

    // Example of responses
    const user = {
        "_id":"67402636c361d139d6ae923e",
        "email":"khoi@gmail.com",
        "password":"$2a$10$nEU2566qGHz2J/80.RdFIuLrXJLMHHphlzvhRvDHjW.vX948G3Y9S",
        "firstName":"Khoi",
        "lastName":"Nguyen",
        "sex":"Nam",
        "address":"KTX Khu A, đường Tạ Quang Bửu, Phường Linh Trung, TP. Thủ Đức, Hồ Chí Minh",
        "cccd":"123456789123",
        "phone":"0123456789",
        "isAdmin":false,
        "isRepairman":false,
        "isCustomer":true
    }

    const order = {
        "_id":"676abd113ef808f1436523f5",
        "user":"67695b317ef401f4a994d53a",
        "orderDetail":["676981cb861ac8f3bbd1a0bf", "67698744b67c1e9c86fe3272", "676987e9b67c1e9c86fe3dd4"],
        "shippingAddress":"KTX Khu A, Đường Tạ Quang Bửu, Phường Linh Trung, Quận Thủ Đức",
        "city":"Thành phố Hồ Chí Minh",
        "country":"Vietnam",
        "phone":"0123456789",
        "totalPrice":39490000,
        "dateOrdered":"2024-12-24T13:43:59.341+00:00",
        "status":"delivered",
        "predictedShippedDate":null,
        "actualShippedDate":"2024-12-24T13:43:59.341+00:00",
        "deleted":false,
    }

    const product_1 = {"_id":{"$oid":"676981cb861ac8f3bbd1a0bf"},"productName":"Samsung Galaxy S24 Ultra","description":"Samsung Galaxy S24 Ultra mẫu điện thoại cao cấp được ra mắt vào đầu năm 2024, sản phẩm tiếp tục kế thừa và cải tiến từ thế hệ trước. Điểm đặc biệt là sử dụng chip Snapdragon 8 Gen 3 for Galaxy, camera 200 MP và tích hợp nhiều tính năng AI.","image":"","imageUrl":"https://cdn.tgdd.vn/Products/Images/42/307174/samsung-galaxy-s24-ultra-xam-1-750x500.jpg","brand":"Samsung","buyPrince":{"$numberIt":"33990000"},"sellPrice":29990000,"category":"Phone","stockProductCount":{"$numberInt":"20"},"storedProduct":{"$numberInt":"20"},"rating":{"$numberInt":"5"},"numberReviews":{"$numberInt":"120"},"isFeature":true,"deleted":true,"createdAt":{"$date":{"$numberLong":"1734967755286"}},"updatedAt":{"$date":{"$numberLong":"1735290581259"}},"__v":{"$numberInt":"0"},"deletedAt":{"$date":{"$numberLong":"1735290581258"}}}
    const quantity_1 = 1;
    
    const product_2 = {"_id":{"$oid":"67698744b67c1e9c86fe3272"},"productName":"Acer Aspire 3 A315","description":"Laptop Acer Aspire A315 44P R9W8 R7 5700U (NX.KSJSV.002) chiếc laptop sở hữu một thiết kế vô cùng thanh lịch, tao nhã đi cùng với nó là cấu hình \"nhẹ nhàng\" phù hợp cho các bạn học sinh, sinh viên hoặc nhân viên văn phòng thiên về các ngành kinh tế nằm trong phân khúc giá.","image":"","imageUrl":"https://cdn.tgdd.vn/Products/Images/44/321436/acer-aspire-a315-44p-r9w8-r7-nxksjsv002-hinh-2-750x500.jpg","brand":"Acer","buyPrice":{"$numberInt":"9990000"},"sellPrice":10990000,"category":"Laptop","stockProductCount":{"$numberInt":"10"},"storedProduct":{"$numberInt":"10"},"rating":{"$numberInt":"4"},"numberReviews":{"$numberInt":"120"},"isFeature":true,"deleted":true,"createdAt":{"$date":{"$numberLong":"1734969156632"}},"updatedAt":{"$date":{"$numberLong":"1735292362323"}},"__v":{"$numberInt":"0"},"deletedAt":{"$date":{"$numberLong":"1735292362322"}}}
    const quantity_2 = 2;

    const product_3 = {"_id":{"$oid":"676987e9b67c1e9c86fe3dd4"},"productName":"Asus Vivobook 15 X1504ZA","description":"Một mẫu laptop học tập - văn phòng đến từ nhà Asus mang hiệu năng ổn định để xử lý công việc, nhiều tiện ích sử dụng đi kèm với đó là một mức giá phù hợp. Laptop Asus Vivobook 15 X1504ZA i3 1215U (NJ102W) chắc chắn là sự lựa chọn tuyệt vời cho không chỉ các bạn sinh viên mà còn là người đi làm để giải quyết mọi vấn đề, công việc hàng ngày.","image":"","imageUrl":"https://cdn.tgdd.vn/Products/Images/44/312414/TimerThumb/asus-vivobook-15-x1504za-i3-nj102w-(2).png","brand":"Asus","buyPrice":{"$numberInt":"777777"},"sellPrice":99907800,"category":"Laptop","stockProductCount":{"$numberInt":"30"},"storedProduct":{"$numberInt":"30"},"rating":{"$numberInt":"5"},"numberReviews":{"$numberInt":"1"},"isFeature":true,"deleted":false,"createdAt":{"$date":{"$numberLong":"1734969321098"}},"updatedAt":{"$date":{"$numberLong":"1735292378089"}},"__v":{"$numberInt":"0"}}
    const quantity_3 = 1;

    const steps = [
        "Đã xác nhận",
        "Đã xuất hàng",
        "Đang giao hàng",
        "Giao thành công"
    ]

    let stepperStatus = 0;
    switch (order.status) {
        case "confirmed":
            stepperStatus = 1;
            break;
        case "exported":
            stepperStatus = 2;
            break;
        case "delivering":
            stepperStatus = 3;
            break;
        case "delivered":
            stepperStatus = 4;
            break;
        default:
            break;
    }


    return (
        <div className='flex flex-col gap-3 items-center mb-5'>
            <PurchaseHistoryNavbar orderId={`#${orderId}`}/>
            
            <div className='bg-gray-200 p-5 static flex flex-col gap-3 items-center justify-center rounded-lg w-3/4'>
                <div className='w-full mb-2 flex flex-row justify-between'>
                    <div className='flex flex-row gap-2'>
                        <div>Ngày đặt:</div>
                        <div className='font-bold'>{`${getDay(order.dateOrdered)}/${getMonth(order.dateOrdered)}/${getYear(order.dateOrdered)}`} - {getTime(order.dateOrdered)}</div>
                    </div>

                    <div className='flex flex-row gap-2'>
                        <div>Trạng thái:</div>
                        <div className='font-bold'>{getStatus(order.status)}</div>
                    </div>
                </div>
                
                <UserInfo firstname={user.firstName} lastname={user.lastName} address={user.address} phone={user.phone} actualShippedDate={order.actualShippedDate} totalPrice={order.totalPrice} />
                
                <div className='w-full mb-2 flex flex-col gap-3'>
                    <div className='flex flex-row gap-2'>
                        <div>Lịch sử giao hàng</div>
                    </div>

                    <Stepper className='w-full' activeStep={stepperStatus} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>


                <div className='flex flex-col gap-2 w-full bg-white rounded-md p-5'>
                    <ProductCard productName={product_1.productName} imageUrl={product_1.imageUrl} quantity={quantity_1} sellPrice={product_1.sellPrice}/>
                    <hr />
                    <ProductCard productName={product_2.productName} imageUrl={product_2.imageUrl} quantity={quantity_2} sellPrice={product_2.sellPrice}/>
                    <hr />
                    <ProductCard productName={product_3.productName} imageUrl={product_3.imageUrl} quantity={quantity_3} sellPrice={product_3.sellPrice}/>
                </div>

                <div className='w-full mb-2 flex flex-row justify-between'>
                    <div>Tiền hàng:</div>
                    <div className='font-semibold text-lg'>90.000.000đ</div>
                </div>

                <div className='w-full mb-2 flex flex-row justify-between'>
                    <div>Phí giao hàng, phụ phí:</div>
                    <div className='font-semibold text-lg'>50.000đ</div>
                </div>

                <div className='w-full mb-2 flex flex-row justify-between'>
                    <div>Tổng đơn hàng:</div>
                    <div className='font-bold text-xl'>90.050.000đ</div>
                </div>
            </div>

            

        </div>
    )
}

export default PurchaseHistoryDetail