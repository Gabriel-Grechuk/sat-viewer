FROM oven/bun:1.1.27-alpine AS build
WORKDIR /home/app/build

COPY . .

RUN bun install && bun run build


FROM oven/bun:1.1.27-alpine AS runner
WORKDIR /home/app/run

COPY --from=build /home/app/build/dist dist

CMD [ "bun", "run", "dist/index.js" ]
