"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net_1 = require("net");
var uuid_1 = require("uuid");
var tcpSocketServer = new net_1.Server();
var clients = new Map();
tcpSocketServer.on("connection", function (socket) {
    var uuid = (0, uuid_1.v4)();
    clients.set(uuid, socket);
    socket.on("data", function (data) { return console.log("incoming data from client ".concat(uuid, ": "), data); });
    socket.on("close", function () {
        console.log("onclose");
        clients.delete(uuid);
    });
    socket.on("end", function () {
        console.log("end");
    });
    socket.on("error", function (err) { return console.log(err); });
});
setInterval(function () {
    console.log(clients.size, process.memoryUsage.rss());
}, 2500);
tcpSocketServer.listen(9999, function () { return console.log("TCP Server Listen on 9999 port"); });
