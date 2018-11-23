const { Router } = require('express');
const controller = require('./controller')
function isSignedIn(req, res, next) {
  if (req.user) { // we attached the user to the request in a middleware if the token is valid
    next();
  }
  else {
    res.status(403).json({
      message: 'Unauthorized access, you should not be on this page',
    });
  }
}

const router = new Router();

router.route('/status').get((req, res) => { res.json({ ok: 1 }) })
router.route('/user/login').post(controller.login)
router.route('/user/signup').post(controller.signup)
router.route('/user/verify').post(controller.verify)

router.route('/user/result')
  .post(isSignedIn, controller.saveResult)
  .get(isSignedIn, controller.getResults)

module.exports = router
