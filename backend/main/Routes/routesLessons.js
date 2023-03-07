const lesRouter = require('express').Router();
const passport = require('passport');
const auth = passport.authenticate('jwt', { session: false })
const { GetClasses, GetLessonsList, GetClassShedule } = require('./routesMethods');

lesRouter.get('/classes', GetClasses);
lesRouter.get('/lessonslist', GetLessonsList);
lesRouter.get('/classes/:class', GetClassShedule);

module.exports = lesRouter;