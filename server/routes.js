const { Router } = require('express');

const router = new Router();

router.route('status').get((req, res) => { res.json({ ok: 1 }) })

module.exports = router