const http = require("http");

const host = 'localhost';
const port = 8080;

http
  .createServer((req, res) => {

    // res.writeHead(200, { 'Content-type': 'application/json' });
    // res.setHeader('Content-Disposition', 'attachment; filename=lista.csv');
    // res.writeHead(200, {'Content-Type': 'application/csv'});

    res.write('Hola Mundo');
    res.end();

  })
  .listen(port, host);
  
  console.log(`Server is running on http://${host}:${port}`);