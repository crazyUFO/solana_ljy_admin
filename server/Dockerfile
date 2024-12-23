# 使用 Node.js 22 作为基础镜像
FROM node:22 AS base

# 设置环境变量
ENV DB_HOST=mysql \
    APP_PORT=7001 \
    PNPM_HOME="/pnpm" \
    PATH="$PNPM_HOME:$PATH"

# 设置时区为上海
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo 'Asia/Shanghai' > /etc/timezone

# 设置工作目录
WORKDIR /server

# 将当前项目文件复制到容器中
COPY ./ /server

# 安装 pnpm
RUN npm install -g pnpm

# 使用镜像加速，设置 npm 和 pnpm 的镜像源为中国大陆的镜像
# RUN npm config set registry https://registry.npmmirror.com \
#     && pnpm config set registry https://registry.npmmirror.com

# 使用多阶段构建来优化镜像
# 1. 安装生产依赖
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# 2. 安装所有依赖并构建应用
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# 最终阶段：仅包含构建产物和生产依赖
FROM base
# 将构建好的 node_modules 和 dist 文件复制到最终镜像中
COPY --from=prod-deps /server/node_modules /server/node_modules
COPY --from=build /server/dist /server/dist

# 暴露应用监听的端口
EXPOSE $APP_PORT

# 容器启动时执行的命令（运行数据库迁移并启动应用）
CMD ["pnpm", "migration:run", "start:prod"]

# 如果需要 PM2 管理进程，可使用以下命令：
# CMD ["pm2-runtime", "ecosystem.config.js"]
