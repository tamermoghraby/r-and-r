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

# Expose Prisma Studio port
EXPOSE 5555

# Start Prisma Studio
CMD ["npx", "prisma", "studio", "--port", "5555", "--browser", "none"]
