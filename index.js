const net = require('net');

const LOCAL_PORT = 8888;

const PROXY_HOST = 'p.webshare.io';
const PROXY_PORT = 80;
const USERNAME = 'zunrrpft-US-rotate';
const PASSWORD = '2826o444egna';

const server = net.createServer(clientSocket => {
  const proxySocket = net.connect(PROXY_PORT, PROXY_HOST, () => {
    const auth = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');
    const connectReq = 
      `HTTP/1.1 200 OK\r\n` +
      `Proxy-Authorization: Basic ${auth}\r\n` +
      `\r\n`;

    proxySocket.write(connectReq);
    clientSocket.pipe(proxySocket);
    proxySocket.pipe(clientSocket);
  });

  proxySocket.on('error', () => clientSocket.destroy());
  clientSocket.on('error', () => proxySocket.destroy());
});

server.listen(LOCAL_PORT, () => {
  console.log(`Local proxy listening on 127.0.0.1:${LOCAL_PORT}`);
});
