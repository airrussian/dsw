"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var worker_threads_1 = require("worker_threads");
var net_1 = require("net");
if (!worker_threads_1.isMainThread) {
    var socket_1 = (0, net_1.createConnection)({ port: 9999 });
    socket_1.on("connect", function () {
        socket_1.write(JSON.stringify(worker_threads_1.workerData));
        socket_1.on("data", function (data) { return worker_threads_1.parentPort.postMessage(data); });
    });
}
