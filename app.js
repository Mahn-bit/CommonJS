const { createServer } = require("http");
const { readFileSync, readFile } = require("fs");
const url = require("url");

const html = readFileSync("Template/index.html", "utf-8");
let products = JSON.parse(readFileSync("Data/products.json", "utf-8"));
let productListHtml = readFileSync("Template/product-list.html", "utf-8");
let productDetails = readFileSync("Template/product-details.html", "utf-8");

const replaceHtml = (template, products) => {
  let output = template;
  output = output.replace("{{%IMAGE%}}", products.productImage);
  output = output.replace("{{%NAME%}}", products.name);
  output = output.replace("{{%MODELNAME%}}", products.modeName);
  output = output.replace("{{%MODELNO%}}", products.modelNumber);
  output = output.replace("{{%SIZE%}}", products.size);
  output = output.replace("{{%CAMERA%}}", products.camera);
  output = output.replace("{{%PRICE%}}", products.price);
  output = output.replace("{{%COLOR%}}", products.color);
  output = output.replace("{{%ID%}}", products.id);
  output = output.replace("{{%ROM%}}", products.ROM);
  output = output.replace("{{%DESC%}}", products.Description);
  return output;
};

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  let { query, pathname: path } = url.parse(req.url, true);

  if (path === "/" || path.toLocaleLowerCase() === "/home") {
    res.writeHead(200, {
      "Content-type": "text/html",
      "my-header": "Hello World",
    });
    res.end(html.replace("{{%CONTENT%}}", `You're in home page`));
  } else if (path.toLocaleLowerCase() === "/about") {
    res.writeHead(200, {
      "Content-Type": "text/html",
      "my-header": "Hello World",
    });
    res.end(html.replace("{{%CONTENT%}}", `You're in about page`));
  } else if (path.toLocaleLowerCase() === "/contact") {
    res.writeHead(200, {
      "Centent-Type": "text/html",
      "my-header": "Hello World",
    });
    res.end(html.replace("{{%CONTENT%}}", `You're in contact page`));
  } else if (path.toLocaleLowerCase() === "/products") {
    if (!query.id) {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      let productHtmlArray = products.map((product) => {
        return replaceHtml(productListHtml, product);
      });
      res.end(html.replace("{{%CONTENT%}}", productHtmlArray.join(",")));
    } else {
      let details = products[query.id];
      let productDetailsResponse = replaceHtml(productDetails, details);
      res.end(html.replace("{{%CONTENT%}}", productDetailsResponse));
    }
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-header": "Hello World",
    });
    res.end(html.replace("{{%CONTENT%}}", `Error 404: ${path} not found!`));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server is now running on http://${hostname}:${port}`);
});
