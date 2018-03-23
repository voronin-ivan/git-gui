const { Router } = require(`express`);
const { getBranches } = require('./core/commands');

const router = new Router();

router.get('/', async (req, res) => {
    return res.render('index', {
        branches: await getBranches,
    });
});

module.exports = router;
