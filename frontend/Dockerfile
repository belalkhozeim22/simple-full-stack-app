FROM node:20-alpine

WORKDIR /app

# Copy package files first
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source
COPY . .

# Build Next.js app
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
