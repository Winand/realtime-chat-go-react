FROM golang:1.20.2-alpine3.17 as builder
RUN mkdir /app
ADD . /app/
WORKDIR /app
RUN go mod download
RUN go build -o main -v

FROM alpine:3.17.3
RUN mkdir /app
COPY --from=builder /app/main /app/main
EXPOSE 8080
CMD ["/app/main"]
