const util = require('util');
const childProcess = require('child_process');
const path = require('path');

const exec = util.promisify(childProcess.exec);
const repoPath = path.join(__dirname, '../../repo');
const options = { cwd: repoPath };

const _runExec = async (command) => {
    const { stdout, stderr } = await exec(command, options);

    if (stderr) {
        console.error(stderr);
    }

    return stdout;
};

const _inlineString = string => string.toString().trim().split('\n');

const getBranches = async () => {
    const data = await _runExec('git branch');
    const branches = _inlineString(data);

    return branches.map(branch => branch.replace('* ', '').trim());
};

const getCommits = async (branch) => {
    const data = await _runExec(`git log --pretty=format:"%h|%ad|%an|%s" --date=short ${branch}`);
    const commits = _inlineString(data);

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
    const data = await _runExec(`git ls-tree ${param}`);
    const files = _inlineString(data);

    return files.map((file) => {
        const arr = file.split(' ');

        return {
            type: arr[1],
            hash: arr[2].split('\t')[0].slice(0, 6),
            name: arr[2].split('\t')[1],
        };
    });
};

const getFileContent = async hash => await _runExec(`git show ${hash}`);
const getCommitName = async hash => await _runExec(`git log -1 --pretty=format:%s ${hash}`);

const getBreadCrumbs = async (param, hash) => {
    const data = await _runExec(`git ls-tree -t -r ${param}`);
    const files = _inlineString(data);
    const breadCrubms = [];

    let fileName = null;

    files.forEach((file) => {
        const fileArr = file.split(' ');
        const fileHash = fileArr[2].split('\t')[0].slice(0, 6);

        if (fileHash === hash) {
            fileName = fileArr[2].split(' ')[0].split('\t')[1];
        }
    });

    fileName.split('/').forEach((filePath) => {
        files.forEach((file) => {
            const fileArr = file.split(' ');
            const fullPath = fileArr[2].split('\t')[1].split('/');

            if (filePath === fullPath[fullPath.length - 1]) {
                breadCrubms.push({
                    name: filePath,
                    hash: fileArr[2].split('\t')[0].slice(0, 6),
                });
            }
        });
    });

    return breadCrubms;
};

module.exports = {
    getBranches,
    getCommits,
    getFiles,
    getFileContent,
    getCommitName,
    getBreadCrumbs,
};
