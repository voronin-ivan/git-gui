const express = require('express');
const path = require('path');
const router = require('./server/router');

const app = express();
const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOST || 'localhost';

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'server/views'));

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', router);

app.listen(PORT, HOSTNAME, () => {
    console.log(`Express app listening on ${HOSTNAME}:${PORT}`);
});
