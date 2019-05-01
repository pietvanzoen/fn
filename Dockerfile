FROM maxmcd/deno:slim

WORKDIR /app

COPY . .

RUN deno --prefetch ./main.ts

CMD ["deno", "--allow-net", "--allow-env", "--allow-read", "./main.ts"]
