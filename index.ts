import { Worker } from "worker_threads";

const devices = Array(10).fill({}).map((_, i) => ({type: 0x1, serial: 10+i, password: 1}));

console.log( devices );

(async () => {
    for ( const device of devices ) {
        await new Promise(resolve => setTimeout(() => { 
            console.log( "starting worker" );
            const worker = new Worker("./deviceWorker.js", { workerData: device });
            worker.on("message", (message) => { console.log( message )});            
            resolve( worker );
        }, 1000));
        console.log( process.memoryUsage.rss() );
    }    
})();
