const { createServer } = require("http");
const { readFileSync } = require("fs");
const { parse } = require("url");
const { escape } = require("querystring");

const products = JSON.parse(readFileSync("Data/products.json", "utf-8"));
const homePage = readFileSync("Template/index.html", "utf-8");
const productListPage = readFileSync("Template/product-list.html", "utf-8");
const productDetailsPage = readFileSync(
  "Template/product-details.html",
  "utf-8"
);

const hostname = "127.0.0.1";
const port = 3000;

const replaceHtml = (template, data) => {
  let output = template;
  output = output.replace("{{%IMAGE%}}", data.productImage);
  output = output.replace("{{%NAME%}}", data.name);
  output = output.replace("{{%MODELNAME%}}", data.modeName);
  output = output.replace("{{%MODELNO%}}", data.modelNumber);
  output = output.replace("{{%SIZE%}}", data.size);
  output = output.replace("{{%CAMERA%}}", data.camera);
  output = output.replace("{{%PRICE%}}", data.price);
  output = output.replace("{{%COLOR%}}", data.color);
  // output = output.replace("{{%ID%}}", data.id);
  output = output.replace("{{%ROM%}}", data.ROM);
  output = output.replace("{{%DESC%}}", data.Description);
  return output;
};

const server = createServer((req, res) => {
  const { query, pathname: path } = parse(req.url, true);

  if (path === "/" || path.toLocaleLowerCase() === "/home") {
    res.end(
      homePage.replace(
        "{{%CONTENT%}}",
        `You're in ${path.slice(1).toLocaleLowerCase()} page.`
      )
    );
  } else if (path.toLocaleLowerCase() === "/products") {
    if (!query.id) {
      const productHtmlArray = products.map((product) => {
        return replaceHtml(productListPage, product);
      });

      res.end(homePage.replace("{{%CONTENT%}}", productHtmlArray.join(",")));
    } else {
      const detailsData = products[query.id];
      const detailsHtml = replaceHtml(productDetailsPage, detailsData);
      res.end(homePage.replace("{{%CONTENT%}}", detailsHtml));
    }
  } else if (path.toLocaleLowerCase() === "/about") {
    res.end(
      homePage.replace(
        "{{%CONTENT%}}",
        `You're in ${path.slice(1).toLocaleLowerCase()} page.`
      )
    );
  } else if (path.toLocaleLowerCase() === "/contact") {
    res.end(
      homePage.replace(
        "{{%CONTENT%}}",
        `You're in ${path.slice(1).toLocaleLowerCase()}`
      )
    );
  } else {
    res.end(
      homePage.replace(
        "{{%CONTENT%}}",
        `Error 404: ${path.slice(1).toLocaleLowerCase()} page not found!`
      )
    );
  }
});

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});

// else {
//   const detailsData = products[query.id];
//   const detailsHtmlArray = replaceHtml(productDetailsPage, detailsData);
//   es.end(homePage.replace("{{%CONTENT%}}", detailsHtmlArray));
// }
