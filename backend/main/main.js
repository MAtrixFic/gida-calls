const express = require('express');
const server = express();
const { PORT, URLENCODER, CORSES } = require('./mainOptions')
const calendarRouter = require('./Routes/routesCalendar');
const authRouter = require('./Routes/routesAuth');
const { DateTime } = require('luxon');
const passport = require('passport')


server.use(CORSES);
server.use(URLENCODER);
server.use(passport.initialize());
require('./Passport/passport')(passport);
server.use('/calendar', calendarRouter);
server.use('/auth', authRouter)

server.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}`);
});
