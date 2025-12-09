# Use a compatible Node version for Prisma 7+
FROM node:22.12.0

WORKDIR /app

# Copy only what Prisma needs
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies (only prisma + @prisma/client required)
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Provide environment variable here
ENV DATABASE_URL="postgres://fe55ef7d91944f0a60cf13be5c24fc03e0d4323c3c62d7959f7e6b8341140329:sk_YQXP7Jl6fG3urgPgWxuKk@db.prisma.io:5432/postgres?sslmode=require"

# Expose Prisma Studio port
EXPOSE 5555

# Start Prisma Studio
# CMD ["npx", "prisma", "studio", "--port", "5555", "--browser", "none"]
CMD ["npx", "prisma", "studio", "--port", "5555", "--url", "${DATABASE_URL}", "--browser", "none"]
