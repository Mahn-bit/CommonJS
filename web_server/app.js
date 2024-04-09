const { createServer } = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  res.end(`Hello from the server`);
  console.log("Request recieved");
});

module.exports = { hostname, port, server };
