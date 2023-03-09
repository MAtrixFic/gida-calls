const lesRouter = require('express').Router();
const passport = require('passport');
const auth = passport.authenticate('jwt', { session: false })
const {GetLessonsShedule, GetClasses, GetLessonsList, GetClassShedule, SetClassShedule, SetTelegramUsers, GetTelegaUser } = require('./routesMethods');

lesRouter.get('/classes', GetClasses);
lesRouter.get('/lessonslist', GetLessonsList);
lesRouter.get('/classes/:type/:class', GetClassShedule);
lesRouter.put('/classes/:type/:class', auth, SetClassShedule);
lesRouter.put('/telegram/users', SetTelegramUsers)
lesRouter.get('/telegram/user', GetTelegaUser)
lesRouter.get('/telegram/lessonslist/class', GetLessonsShedule)

module.exports = lesRouter;