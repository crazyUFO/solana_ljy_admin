# 指定项目目录
ARG PROJECT_DIR=/vue3-antdv-admin

# 第一阶段: 构建阶段
FROM node:22-slim as builder
ARG PROJECT_DIR
WORKDIR $PROJECT_DIR

# 安装 pnpm 包管理工具
RUN npm install -g pnpm

# 复制项目文件到容器中
COPY . ./

# 安装依赖
RUN pnpm install

# 构建项目（生成生产环境代码）
ENV VITE_BASE_URL=/
RUN pnpm build

# 第二阶段: 生产阶段
FROM nginx:alpine as production
ARG PROJECT_DIR

# 复制构建好的静态文件到 Nginx 默认的静态文件目录
COPY --from=builder $PROJECT_DIR/dist/ /usr/share/nginx/html

# 你可以选择将自定义的 nginx 配置文件也复制过来，取消下面的注释即可
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
