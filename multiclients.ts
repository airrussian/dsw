import { createConnection } from "net";

const factoryConnect = (i: number) => new Promise( resolve => {
    console.log(`start connect ${i}`);
    const socket = createConnection({ host: "localhost", port: 9999 });
    socket.on("connect", () => {    
        socket.write("Hello World");
        setTimeout(() => resolve(true), 0);
    });
});

(async() => {
    for ( let i = 0; i < 1; i++) await factoryConnect(i);
})()


