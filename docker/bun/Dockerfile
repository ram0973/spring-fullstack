FROM oven/bun:1.1.40-debian

COPY package.json ./
COPY bun.lockb ./
COPY src ./

RUN bun install
