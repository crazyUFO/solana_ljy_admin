# 使用官方 Node.js 22 镜像作为基础镜像
FROM node:22

# 设置工作目录
WORKDIR /server

# 将项目中的 dist 文件夹复制到镜像中的工作目录
COPY ./dist ./dist
COPY ./node_modules ./node_modules

# 安装项目的依赖项（如果需要的话）
# 如果你有 package.json 和 package-lock.json 文件，取消注释以下两行并添加到 dist 文件夹中
# COPY package*.json ./
# RUN npm install --production

# 让 Node.js 启动 main.js 并监听 7001 端口
CMD ["node", "./dist/main.js"]

# 暴露服务端口
EXPOSE 7001
