const { Router } = require('express');
const {
    getBranches,
    getCommits,
    getCommitName,
    getFiles,
    getFileContent,
    getBreadCrumbs,
} = require('./core/git');

const router = new Router();

router.get('/', async (req, res) => {
    try {
        return res.render('index', {
            branches: await getBranches(),
        });
    } catch (error) {
        console.error(error);
        return error.code === 'ENOENT' ?
            res.status(500).render('500') :
            res.status(404).render('404');
    }
});

router.get('/:branch', async (req, res) => {
    const branch = req.params.branch;
    const file = req.query.file;
    const path = req.query.path;

    try {
        if (file) {
            return res.render('preview', {
                branch,
                breadCrumbs: await getBreadCrumbs(branch, file),
                fileContent: await getFileContent(file),
            });
        }

        if (path) {
            return res.render('files', {
                branch,
                files: await getFiles(path),
                breadCrumbs: await getBreadCrumbs(branch, path),
            });
        }

        return res.render('branch', {
            branch,
            commits: await getCommits(branch),
            files: await getFiles(branch),
        });
    } catch (error) {
        console.error(error);
        return res.status(404).render('404');
    }
});

router.get('/:branch/:commit', async (req, res) => {
    const { commit, branch } = req.params;
    const { file, path } = req.query;

    try {
        if (file) {
            return res.render('preview', {
                branch,
                breadCrumbs: await getBreadCrumbs(branch, file),
                fileContent: await getFileContent(file),
            });
        }

        const fileHash = path || commit;
        const breadCrumbs = path ? await getBreadCrumbs(commit, fileHash) : null;

        return res.render('files', {
            branch,
            breadCrumbs,
            commit: {
                name: await getCommitName(commit),
                hash: commit,
            },
            files: await getFiles(fileHash),
        });
    } catch (error) {
        console.error(error);
        return res.status(404).render('404');
    }
});

module.exports = router;
