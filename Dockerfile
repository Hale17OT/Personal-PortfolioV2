# syntax=docker/dockerfile:1.7

# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json ./
COPY package-lock.json* ./
RUN npm install --no-audit --no-fund --loglevel=error

COPY . .
RUN npm run build

# ---- Serve stage ----
FROM nginx:1.27-alpine AS runner
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
