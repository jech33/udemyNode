const http = require("http");

http.createServer( (req, res) => {
    res.write("Hola mundo");
})