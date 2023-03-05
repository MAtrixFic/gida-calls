const lesRouter = require('express').Router();
const passport = require('passport');
const auth = passport.authenticate('jwt', { session: false })
const { GetClasses, GetLessonsList } = require('./routesMethods');

lesRouter.get('/classes', GetClasses);
lesRouter.get('/lessonslist', GetLessonsList);

module.exports = lesRouter;