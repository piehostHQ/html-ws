const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (message) => {
        console.log(`Received message: ${message}`); 
        broadcast(message); 
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

function broadcast(message) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message); 
        }
    });
}

console.log("WebSocket server started on port 8080");