const { nextState, updateUser } = require("./immer/app");
const { hostname, server, port } = require("./web_server/app");

server.listen(port, hostname, () => {
  console.log(`Runninmg server at ${hostname}:${port}`);
});
