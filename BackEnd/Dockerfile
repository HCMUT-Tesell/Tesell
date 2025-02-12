# Sử dụng Node.js
FROM node:18-alpine

WORKDIR /app

# Copy package.json và cài đặt dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Mở cổng API
EXPOSE 5000

# Chạy server
CMD ["npm", "start"]
