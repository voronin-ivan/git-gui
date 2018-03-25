const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
const path = require('path');

const repoPath = path.join(__dirname, '../../repo');
const options = { cwd: repoPath };

const execCommand = async (command) => {
    const { stdout, stderr } = await exec(command, options);

    if (stderr) {
        console.log(stderr);
    }

    return stdout;
};

const getBranches = async () => {
    const data = await execCommand('git branch');
    const branches = data.toString().trim().split('\n');

    return branches.map(branch => branch.replace('* ', '').trim());
};

const getCommits = async (branch) => {
    const data = await execCommand(`git log --pretty=format:"%h|%ad|%an|%s" --date=short ${branch}`);
    const commits = data.toString().trim().split('\n');

    return commits.map((commit) => {
        const commitArr = commit.split('|');

        return {
            hash: commitArr[0],
            date: commitArr[1],
            autor: commitArr[2],
            message: commitArr[3],
        };
    });
};

const getFiles = async (param) => {
    const data = await execCommand(`git ls-tree ${param}`);
    const files = data.toString().trim().split('\n');

    return files.map(data => {
        const arr = data.split(' ');
        return {
            type: arr[1],
            hash: arr[2].split('\t')[0].slice(0, 6),
            name: arr[2].split('\t')[1]
        };
    });
};

const getFileContent = async (hash) => await execCommand(`git show ${hash}`);
const getFileName = async (hash) => await execCommand(`git show ${hash}`);
const getCommitName = async (hash) => await execCommand(`git log -1 --pretty=format:%s ${hash}`);
const getBreadCrumbs = async (hash, branch) => {
    const data = await execCommand(`git ls-tree -t -r ${branch}`);
    const files = data.toString().trim().split('\n');
    const breadCrubms = [];

    let fileName = null;

    files.forEach((file) => {
        const fileArr = file.split(' ');
        const fileHash = fileArr[2].split('\t')[0].slice(0, 6);

        if (fileHash === hash) {
            fileName = fileArr[2].split(' ')[0].split('\t')[1];
        }
    });

    const fileNameArr = fileName.split('/');

    fileNameArr.forEach(path => {
        files.forEach((file) => {
            const fileArr = file.split(' ');
            const fullPath = fileArr[2].split('\t')[1].split('/');

            if (path === fullPath[fullPath.length - 1]) {
                breadCrubms.push({
                    name: path,
                    hash: fileArr[2].split('\t')[0].slice(0, 6),
                });
            }
        });
    });

    return breadCrubms;
}

module.exports = {
    getBranches,
    getCommits,
    getFiles,
    getFileContent,
    getCommitName,
    getBreadCrumbs
};
