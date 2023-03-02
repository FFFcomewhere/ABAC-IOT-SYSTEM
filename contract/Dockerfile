# 指定一个基础镜像
FROM node:18.14.0 AS builder

# 安装Truffle
RUN npm install -g truffle@5.7.4

# 设置容器内的工作目录
WORKDIR /app

# 将Truffle项目复制到容器中
COPY . /app

# 安装项目依赖
RUN npm install

CMD ["pkg", ". --targets=node12-win-x64,node12-linux-x64,node12-macos-x64 --output=truffle" ]

# 启动应用程序
CMD ["npm", "start"]
