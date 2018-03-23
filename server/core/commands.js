const spawn = require('child_process').spawn;
const path = require('path');

const repoPath = path.join(__dirname, '../../repo');

const getBranches = new Promise((res, rej) => {
    console.log('get branches');
});
