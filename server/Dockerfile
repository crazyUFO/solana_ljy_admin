# 使用 node:20-slim 基础镜像
FROM node:20-slim AS base

# 设置环境变量
ARG PROJECT_DIR=/server  # 根据你的项目路径修改
ARG PNPM_HOME="/pnpm"
ENV PNPM_HOME=$PNPM_HOME
ENV DB_HOST=mysql \
    APP_PORT=7001 \
    PATH="$PNPM_HOME:$PATH"

# 安装 yarn 和启用 corepack
RUN npm install -g yarn
RUN corepack enable && yarn global add pm2

# 设置工作目录
WORKDIR $PROJECT_DIR
COPY ./ $PROJECT_DIR
RUN chmod +x ./wait-for-it.sh 

# 设置时区为上海
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo 'Asia/Shanghai' > /etc/timezone

# 第二阶段：安装生产依赖
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# 第三阶段：构建应用
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# 最终镜像
FROM base
COPY --from=prod-deps $PROJECT_DIR/node_modules $PROJECT_DIR/node_modules
COPY --from=build $PROJECT_DIR/dist $PROJECT_DIR/dist

# 暴露应用端口
EXPOSE $APP_PORT

# 使用 pm2 启动生产环境应用
ENTRYPOINT ["./wait-for-it.sh", "$DB_HOST:$DB_PORT", "--", "pnpm", "migration:run", "&&", "pm2-runtime", "ecosystem.config.js"]
