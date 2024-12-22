# 使用 node:22-slim 基础镜像
FROM node:22-slim AS base

# 设置环境变量
ARG PROJECT_DIR
ENV DB_HOST=mysql \
    APP_PORT=7001 \
    PNPM_HOME="/pnpm" \
    PATH="$PNPM_HOME:$PATH"

# 启用 corepack（用于管理 yarn 和 pnpm）并安装 pm2
RUN corepack enable && yarn global add pm2

# 设置工作目录
WORKDIR $PROJECT_DIR

# 复制项目文件到容器中
COPY ./ $PROJECT_DIR

# 给脚本文件添加可执行权限
RUN chmod +x ./wait-for-it.sh 

# 设置时区为上海
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo 'Asia/Shanghai' > /etc/timezone

# 安装生产环境依赖
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# 构建阶段
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# 最终镜像，复制生产依赖和构建产物
FROM base
COPY --from=prod-deps $PROJECT_DIR/node_modules $PROJECT_DIR/node_modules
COPY --from=build $PROJECT_DIR/dist $PROJECT_DIR/dist

# 暴露端口
EXPOSE $APP_PORT

# 使用 PM2 启动应用（保留 PM2 相关部分）
ENTRYPOINT ./wait-for-it.sh $DB_HOST:$DB_PORT -- pnpm migration:run && pm2-runtime ecosystem.config.js
