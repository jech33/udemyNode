const http = require("http");

const host = 'localhost';
const port = 8080;

http
  .createServer((req, res) => {
    res.write('Hola Mundo')
    res.end();
  })
  .listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
