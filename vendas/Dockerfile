# vendas/Dockerfile
FROM golang:1.21

WORKDIR /app

COPY . .

RUN go mod init vendas || true
RUN go mod tidy

EXPOSE 5003

CMD ["go", "run", "main.go"]
