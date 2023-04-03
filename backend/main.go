package main

import (
	"fmt"
	"net/http"

	"github.com/winand/realtime-chat-go-react/pkg/websocket"
)

var newClientID = 0

// define our WebSocket endpoint
func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	// upgrade this connection to a WebSocket
	// connection
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+V\n", err)
		return
	}

	client := &websocket.Client{
		ID:   fmt.Sprint(newClientID),
		Conn: conn,
		Pool: pool,
	}
	newClientID += 1

	pool.Register <- client
	client.Read()
}

func setupRoutes() {
	pool := websocket.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})
}

func main() {
	fmt.Println("Distributed Chat App v0.01")
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
