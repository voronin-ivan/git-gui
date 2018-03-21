const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.NODE_PORT;

app.get('/', (request, response) => {
    fs.readFile('src/index.html', (error, data) => {
        if (error) {
            response.statusCode = 404;
            response.end(error);
        } else {
            response.end(data);
        }
    });
});
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port, () => console.log(`Express app listening on localhost:${port}`));
