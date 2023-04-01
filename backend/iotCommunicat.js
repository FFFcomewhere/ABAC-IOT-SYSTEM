// var net = require('net');
// //模块引入
// var listenPort = 8082;//监听端口
// var server = net.createServer(function (socket) {
//     // 创建socket服务端
//     console.log('connect: ' +
//         socket.remoteAddress + ':' + socket.remotePort);
//     socket.setEncoding('binary');
//     //接收到数据
//     socket.on('data', function (data) {
//         console.log('client send:' + data);
//     });
//     socket.write('Hello client!\r\n');
//     // socket.pipe(socket);
//     //数据错误事件
//     socket.on('error', function (exception) {
//         console.log('socket error:' + exception);
//         socket.end();
//     });
//     //客户端关闭事件
//     socket.on('close', function (data) {
//         console.log('client closed!');
//         // socket.remoteAddress + ' ' + socket.remotePort);
//     });
// }).listen(listenPort);
// //服务器监听事件
// server.on('listening', function () {
//     console.log("server listening:" + server.address().port);
// });
// //服务器错误事件
// server.on("error", function (exception) {
//     console.log("server error:" + exception);
// });

const net = require('net');

const PORT = 8082;
const server = net.createServer();

const clients = []; // 存储连接到服务器的客户端

server.on('connection', socket => {
    console.log(`New client connected: ${socket.remoteAddress}:${socket.remotePort}`);

    clients.push(socket); // 将新连接的客户端添加到 clients 数组中

    socket.on('data', data => {
        console.log(`Received data from client: ${data}`);

        // 将收到的数据广播给所有客户端
        clients.forEach(client => {
            if (client !== socket && client.writable) {
                client.write(`Client ${socket.remoteAddress}:${socket.remotePort} says: ${data}`);
            }
        });
    });

    socket.on('end', () => {
        console.log(`Client disconnected: ${socket.remoteAddress}:${socket.remotePort}`);

        // 将断开连接的客户端从 clients 数组中移除
        const index = clients.indexOf(socket);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });

    socket.on('error', error => {
        console.error(`Socket error: ${error}`);
    });
});

server.on('listening', () => {
    console.log(`Server is listening on port ${PORT}`);
});

server.on('error', error => {
    console.error(`Server error: ${error}`);
});

server.listen(PORT);
