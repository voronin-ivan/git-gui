const { runExec, stringToArr, getHash } = require('./utils');

const getBranches = async (exec = runExec) => {
    const data = await exec('git branch');
    const branches = stringToArr(data);

    return branches.map(branch => branch.replace('* ', '').trim());
};

const getCommits = async (branch, exec = runExec) => {
    const data = await exec(`git log --pretty=format:"%h|%ad|%an|%s" --date=short ${branch}`);
    const commits = stringToArr(data);

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

const getFiles = async (param, exec = runExec) => {
    const data = await exec(`git ls-tree ${param}`);
    const files = stringToArr(data);

    return files.map((file) => {
        const arr = file.split(' ');

        return {
            type: arr[1],
            hash: getHash(arr[2]),
            name: arr[2].split('\t')[1],
        };
    });
};

const getFileContent = async (hash, exec = runExec) => {
    const fileName = await exec(`git rev-list --objects --all | grep ${hash}`);
    const fileExt = fileName.split(' ')[1].split('.').reverse()[0].trim();
    const content = await exec(`git show ${hash}`);
    const mediaExt = new Set(['jpeg', 'jpg', 'png', 'gif', 'svg']);

    if (mediaExt.has(fileExt)) {
        return { type: 'image' };
    }

    return {
        type: 'simple',
        content,
    };
};

const getCommitName = async hash => await runExec(`git log -1 --pretty=format:%s ${hash}`);

const getBreadCrumbs = async (param, hash, exec = runExec) => {
    const data = await exec(`git ls-tree -t -r ${param}`);
    const files = stringToArr(data);
    const breadCrubms = [];

    let fileName = null;

    files.forEach((file) => {
        const fileArr = file.split(' ');
        const fileHash = getHash(fileArr[2]);

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
                    hash: getHash(fileArr[2]),
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
