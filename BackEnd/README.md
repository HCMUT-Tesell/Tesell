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
- Copy nội dung của file example_env vào file .env vừa tạo
- Để tìm username và password, đăng nhập vào https://account.mongodb.com/account/login và nhắn Khôi để được add vào database
- Sau khi vào được database, ở thanh sidebar bên phải, vào mục Database Access
- Chọn "ADD NEW DATABASE USER", ở mục **Password Authentication** nhập tên user và chọn Autogenerate Secure Password, xong nhấn nút Copy, rồi paste mật khẩu ở nơi nào đó; ở mục **Database User Privileges-Built-in Role**, chọn Add built-in Role, xong chọn Read and Write to any database. Sau khi đã hoàn thành, nhấn nút Add User ở dưới.
- Trong file .env vừa tạo ở trên, thay đổi <username> bằng user name bạn đã nhập ở trên, thay đổi <password> bằng password bạn đã copy

# Tài liệu gg doc cho việc sử dụng api ở back end

link gg doc: https://docs.google.com/document/d/1LOaHgMwtU9-eAghDPdcnD6M3m2qjXgE_eKS2YM0iru4/edit?hl=vi&tab=t.0