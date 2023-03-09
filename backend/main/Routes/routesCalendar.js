const router = require('express').Router();
const passport = require('passport');
const auth = passport.authenticate('jwt', { session: false })
const { GetDynamic, GetStatic, PutDynamic, GetDynamicNow, PutStatic, GetDynamicBellsSheduleForTelegram } = require('./routesMethods');

router.get('/dynamic/now', GetDynamicNow);
router.get('/static', auth, GetStatic);
router.get('/dynamic', auth, GetDynamic);
router.get('/help', (req, res) => {
    res.send('helps');
})
router.get('/bot/bells/:date/', GetDynamicBellsSheduleForTelegram)
router.put('/dynamic', auth, PutDynamic);
router.put('/static', auth, PutStatic);


module.exports = router;