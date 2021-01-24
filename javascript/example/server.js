
const express = require('express')
const serveStatic = require('serve-static');
const app = express();
const path = require('path');

const hostname = "127.0.0.1";
const port = 8000;

app.use(serveStatic(path.join(__dirname, '/')))

// Prints a log once the server starts listening
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})

