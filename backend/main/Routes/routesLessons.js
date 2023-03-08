const lesRouter = require('express').Router();
const passport = require('passport');
const auth = passport.authenticate('jwt', { session: false })
const { GetClasses, GetLessonsList, GetClassShedule, SetClassShedule } = require('./routesMethods');

lesRouter.get('/classes', GetClasses);
lesRouter.get('/lessonslist', GetLessonsList);
lesRouter.get('/classes/:type/:class', GetClassShedule);
lesRouter.put('/classes/:type/:class', auth, SetClassShedule);

module.exports = lesRouter;