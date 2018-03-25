const formatBranches = (data) => {
    const branches = data.toString().trim().split('\n');
    return branches.map(branch => branch.replace('* ', '').trim());
};

const formatCommits = (data) => {
    const commitsArr = data.toString().trim().split('\n');
    const commits = commitsArr.map((commit) => {
        const commitArr = commit.split('|');

        return {
            hash: commitArr[0],
            date: commitArr[1],
            autor: commitArr[2],
            message: commitArr[3],
        };
    });

    return commits;
};

module.exports = {
    formatBranches,
    formatCommits,
};
