const { hostname, server, port } = require("./web_server/app");

server.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}`);
});
