# ---------- BUILD STAGE ----------
    FROM node:18-alpine AS build

    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    RUN npm run build
    
    # ---------- RUNTIME STAGE ----------
    FROM node:18-alpine
    
    WORKDIR /app
    
    # Copy only production deps
    COPY package*.json ./
    RUN npm install --omit=dev
    
    # Copy built output ONLY
    COPY --from=build /app/dist ./dist
    COPY --from=build /app/public ./public
    
    EXPOSE 5000
    CMD ["node", "dist/server.js"]
    