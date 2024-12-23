import axios from 'axios';
import crypto from 'crypto';

var accessKey = 'F8BBA842ECF85';
var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';

class PaymentController {
    // [POST] /api/payment/create
    async initPayment(req, res) {
        const {
            totalPrice = 10000,
            tesellCustomerId
        } = req.body
        console.log(req.body)
        

        let orderInfo = 'pay with Tesell';
        var partnerCode = 'MOMO';
        var redirectUrl = 'https://www.youtube.com'; // redirect after payment, redirect callback
        var ipnUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
        var requestType = "payWithMethod";
        var amount = totalPrice;
        var orderId = partnerCode + new Date().getTime();
        var requestId = tesellCustomerId + new Date().getTime();
        var extraData = '';
        var orderGroupId = '';
        var autoCapture = true;
        var lang = 'vi';

        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
        //puts raw signature
        console.log("--------------------RAW SIGNATURE----------------")
        console.log(rawSignature)
        //signature
        var signature = crypto.createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');
        console.log("--------------------SIGNATURE----------------")
        console.log(signature)

        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            partnerName: "Tesell",
            storeId: "MomoTestStore",
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            lang: lang,
            requestType: requestType,
            autoCapture: autoCapture,
            extraData: extraData,
            orderGroupId: orderGroupId,
            signature: signature
        })

        const options = {
            method: "POST",
            url: "https://test-payment.momo.vn/v2/gateway/api/create",
            headers: {
                'Content-Type': 'application/json',
                'Content-length': Buffer.byteLength(requestBody)
            },
            data: requestBody
        }

        let result;
        try {
            result = await axios(options)
            return res.status(200).json(result.data)
        } catch (error) {
            console.log('error: ' + error)
            return res.status(500).json({
                error,
                message: 'server error'
            })
        }
    }
    
    // [POST] /api/payment/callback-payment
    async callBackPayment(req, res) {
        // hàm callback sẽ nhận requsetId tường đươcng với orderId của tesell
        // để tieenhs hành cập nhật trạng thía đơn hàng
        
        
        res.status(200).json({
            message: "api sử dung sau khi thanh toán sẽ redirect về URL của app để cập nhật status của order",
            message1: "api chưa được hoàn thành hết"
        })
    }  

    // [GET] / api/payment/transaction-status
    async transactionStatus(req, res) {
        // hàm này sẽ nhận được thông tin cần thiết theo api của momo 
        // để tiến hành kiểm tra trạng thái đơn hàng
        // sau đó nếu khác database sẽ cập nhật lại

        res.status(200).json({
            message: "api chưa viết xong"
        })
    }
}

export default new PaymentController();
