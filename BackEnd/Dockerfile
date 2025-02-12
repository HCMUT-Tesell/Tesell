# Sử dụng Node.js LTS
FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Expose port (khớp với cổng trong server.js)
EXPOSE 5000

# Khởi chạy server
CMD ["node", "server.js"]
