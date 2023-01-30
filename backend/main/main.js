const express = require('express');
const server = express();
const { PORT, ADDRESSES, URLENCODER, CORSES } = require('./mainOptions')
const calendarRouter = require('./Routes/routesCalendar');
const authRouter = require('./Routes/routesAuth');
const passport = require('passport')

server.use(CORSES);
server.use(URLENCODER);
server.use(passport.initialize());
require('./Passport/passport')(passport);
server.use('/calendar', calendarRouter);
server.use('/auth', authRouter)

server.listen(PORT, ADDRESSES.local, () => {
    console.log(`Server http://${ADDRESSES.local}:${PORT} has been started`);
});
