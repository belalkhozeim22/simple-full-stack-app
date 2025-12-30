FROM node:18-alpine

WORKDIR /app

# Install deps
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build Strapi
RUN pnpm build

EXPOSE 1337

CMD ["pnpm", "start"]
