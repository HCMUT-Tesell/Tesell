# Sử dụng Node.js LTS
FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Build ứng dụng
RUN npm run build

# Sử dụng Nginx để serve app
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
