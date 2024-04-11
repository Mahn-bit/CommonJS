const { createServer } = require("http");
const { readFileSync } = require("fs");

const html = readFileSync("web_server/Template/index.html", "utf-8");

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  let path = req.url;

  if (path === "/" || path.toLocaleLowerCase() === "/home") {
    res.end(`You're in the home page!`);
  } else if (path.toLocaleLowerCase() === "/about") {
    res.end(`You're in the about page!`);
  } else if (path.toLocaleLowerCase() === "/contact") {
    res.end(`You're in the contact page`);
  } else {
    res.end(`Error 404: Page not found`);
  }
  console.log("Request recieved");
});

module.exports = { hostname, port, server };
