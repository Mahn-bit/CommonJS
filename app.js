const { createServer } = require("http");
const { readFileSync, readFile } = require("fs");

const html = readFileSync("Template/index.html", "utf-8");
let products = JSON.parse(readFileSync("Data/products.json", "utf-8"));
let productListHtml = readFileSync("Template/product-list.html", "utf-8");

const productHtmlArray = products.map((product) => {
  let output = productListHtml;
  output = output.replace("{{%IMAGE%}}", product.productImage);
  output = output.replace("{{%NAME%}}", product.name);
  output = output.replace("{{%MODELNAME%}}", product.modeName);
  output = output.replace("{{%MODELNO%}}", product.modelNumber);
  output = output.replace("{{%SIZE%}}", product.size);
  output = output.replace("{{%CAMERA%}}", product.camera);
  output = output.replace("{{%PRICE%}}", product.price);
  output = output.replace("{{%COLOR%}}", product.color);
  return output;
});

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  let path = req.url.toLocaleLowerCase();

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
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end(html.replace("{{%CONTENT%}}", productHtmlArray.join(",")));
    console.log(productHtmlArray.join(","));
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
      "my-header": "Hello World",
    });
    res.end(html.replace("{{%CONTENT%}}", `Error 404: ${path} not found!`));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
