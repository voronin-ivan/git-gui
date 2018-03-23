const express = require('express');
const fs = require('fs');
const path = require('path');
const routes = require('./server/routes');

const app = express();
const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOST || 'localhost';

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'server/views'));

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', routes);

app.listen(PORT, HOSTNAME, () => {
    console.log(`Express app listening on ${HOSTNAME}:${PORT}`);
});
