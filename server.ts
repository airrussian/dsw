import { Server, Socket } from "net";
import { v4 } from "uuid";

const tcpSocketServer = new Server();

const clients = new Map<string, Socket>();

tcpSocketServer.on("connection", (socket) => {
    const uuid = v4();
    clients.set( uuid, socket );

    socket.on("data", data => console.log(`incoming data from client ${uuid}: `, data));    

    socket.on("close", () => {
        console.log("onclose");
        clients.delete( uuid );
    });

    socket.on("end", () => {
        console.log("end");
    });
    
    socket.on("error", err => console.log( err ));

    socket.setTimeout(1000, () => console.log(`timeout ${uuid}`));
});

setInterval(() => {
    console.log( clients.size, process.memoryUsage.rss() );
}, 2500);

tcpSocketServer.listen(9999, () => console.log("TCP Server Listen on 9999 port"));