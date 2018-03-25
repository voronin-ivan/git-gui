const { Router } = require('express');
const {
    getBranches,
    getCommits,
    getCommitName,
    getFiles,
    getFileName,
    getFileContent,
    getBreadCrumbs
} = require('./core/utils');

const router = new Router();

router.get('/', async (req, res) => res.render('index', {
    branches: await getBranches(),
}));

router.get('/:branch', async (req, res) => {
    const branch = req.params.branch;

    if (req.query.file) {
        const content = await getFileContent(req.query.file);

        return res.render('preview', {
            branch,
            // breadCrumbs: req.query.path ? await getBreadCrumbs(req.query.file, branch) : null;
            fileContent: content,
        });
        // return res.send(content);
    }

    if (req.query.path) {
        const breadCrumbs = req.query.path ? await getBreadCrumbs(req.query.path, branch) : null;

        return res.render('files', {
            branch,
            files: await getFiles(req.query.path),
            breadCrumbs
        });
    }

    return res.render('branch', {
        branch,
        commits: await getCommits(branch),
        files: await getFiles(branch)
    });
});

router.get('/:branch/:commitHash', async (req, res) => {
    const { commitHash, branch } = req.params;
    const commit = {
        name: await getCommitName(commitHash),
        hash: commitHash
    };

    if (req.query.file) {
        const content = await getFileContent(req.query.file);
        return res.send(content);
    }

    const filesPath = req.query.path ? req.query.path : commitHash;
    const breadCrumbs = req.query.path ? await getBreadCrumbs(filesPath, commitHash) : null;

    return res.render('files', {
        branch,
        commit,
        breadCrumbs,
        files: await getFiles(filesPath)
    });
});

module.exports = router;
