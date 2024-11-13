# Cách chạy BackEnd
sau khi clone về thì mọi người vào thư mục BackEnd, chú ý đường Path
# Phải ở thư mục Backend

mở terminal và chạy theo thứ tự dưới đây:

chạy câu lệnh: npm install

sau đó chay lệnh npm start thì app sẽ chạy ở port localhost:8000

vào file app/controllers/SiteController.js thay đổi HomePage thành string mới Hompage nodemon

và lưu lại; refresh localhost:8000 và không chạy lại npm start ở terminal

nếu có thay đổi nodemon thì đã xong cài đặt tất cả các thư viện liên quan BackEnd

# Connect to Mongo DB
- Trong folder backend, tạo 1 file mới tên ".env"
- Thêm vào nội dung sau:
        MONGO_URI="mongodb+srv://<username>:<password>@cluster0.s2j37.mongodb.net/TesellDB?retryWrites=true&w=majority&appName=Cluster0"
        PORT=8000
- Để tìm username và password, đăng nhập vào https://account.mongodb.com/account/login và nhắn Khôi để được add vào database

