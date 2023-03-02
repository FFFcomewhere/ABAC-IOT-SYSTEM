# 第一阶段：构建应用
FROM node:14.18.1-alpine AS builder

WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm install

# 复制源代码并构建
COPY . .
RUN npm run build

# 第二阶段：运行应用
FROM node:14.18.1-alpine

WORKDIR /app

# 只复制运行时需要的文件
COPY package*.json ./
COPY --from=builder /app/dist ./dist

# 安装生产依赖
RUN npm install --production

# 暴露端口并启动应用
EXPOSE 8001
CMD ["npm", "start"]
