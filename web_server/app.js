const { createServer } = require("http");
const { readFileSync } = require("fs");

const html = readFileSync("web_server/Template/index.html", "utf-8");

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  let path = req.url;

  if (path === "/" || path.toLocaleLowerCase() === "/home") {
    res.end(html.replace("{{%CONTENT%}}", `You're in about page`));
  } else if (path.toLocaleLowerCase() === "/about") {
    res.end(html.replace("{{%CONTENT%}}", `You're in about page`));
  } else if (path.toLocaleLowerCase() === "/contact") {
    res.end(html.replace("{{%CONTENT%}}", `You're in the contact page`));
  } else {
    res.end(html.replace("{{%CONTENT%}}", `Error 404: Page not found`));
  }
  console.log("Request recieved");
});

module.exports = { hostname, port, server };
