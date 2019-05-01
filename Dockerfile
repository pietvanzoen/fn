FROM maxmcd/deno:slim

WORKDIR /app

COPY . .

RUN deno --prefetch ./main.ts

ENV PORT=4000

HEALTHCHECK --interval=5m --timeout=3s CMD wget -qO- 0.0.0.0:${PORT}/healthcheck/index.html || exit 1

CMD ["deno", "--allow-net", "--allow-env", "--allow-read", "./main.ts"]
