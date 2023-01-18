// core modules
const fs = require('fs');
const http = require('http');
const url = require('url');

// 3rd party modules
const slugify = require('slugify');

// our modules
const replaceTemplate = require('./modules/replaceTemplate');

////////////////////////////////////////////////////////////////////
// // Files

// const hello = 'Hello World';
// console.log(hello);

// // Blocking, Synchronous code

// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textInput);

// const textOutput = `This is what we know about the avacado: ${textInput}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOutput);
// console.log('File is written');

// // Non-blocking, asynchronous code
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//   if (err) return console.log('Error!!!');
//   fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//       console.log(data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//         console.log('Your file has been written');
//       });
//     });
//   });
// });
// console.log('Will read the file!!!');

////////////////////////////////////////////////////////////////////
// // Server

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

const server = http.createServer((req, res) => {
  // console.log(req);
  // console.log(req.url);
  // console.log(url.parse(req.url, true));

  // ES6 Destructuring
  const { query, pathname } = url.parse(req.url, true);

  // Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHTML = dataObj
      .map((el) => replaceTemplate(templateCard, el))
      .join('');
    // console.log(cardsHTML);

    const output = templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHTML);

    res.end(output);

    // Product Page
  } else if (pathname === '/product') {
    // console.log(query);
    const product = dataObj[query.id];

    res.writeHead(200, { 'Content-type': 'text/html' });
    const output = replaceTemplate(templateProduct, product);

    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-custom-error': 'hello-world'
    });
    res.end('<h1>Page not Found!!!</h1>');
    res.end('Page not Found!!!');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to request on port 8000');
});
