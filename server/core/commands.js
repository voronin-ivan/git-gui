const { spawn } = require('child_process');
const path = require('path');

const repoPath = path.join(__dirname, '../../repo');
const options = { cwd: repoPath };

const getBranches = new Promise((res, rej) => {
    const command = spawn('git', ['branch'], options);

    command.stdout.on('data', data => res(data.toString().split('\n')));
    command.stderr.on('data', data => rej(data.toString()));
});

module.exports = {
    getBranches,
};
