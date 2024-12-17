import { isMainThread, parentPort, workerData } from "worker_threads";
import { createConnection } from "net";

if ( !isMainThread ) {
    const socket = createConnection({ port: 9999 });
    socket.on("connect", () => {
        socket.write(JSON.stringify( workerData));
        socket.on("data", data => parentPort!.postMessage( data ));
    });
}