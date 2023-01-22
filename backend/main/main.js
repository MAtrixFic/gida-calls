const express = require('express');
const server = express();
const { PORT, URLENCODER, CORSES } = require('./mainOptions')
const calendarRouter = require('./Routes/routesCalendar');
const authRouter = require('./Routes/routesAuth');
const { DateTime } = require('luxon');
const mongoose = require('mongoose');
const {CallsOBJ, RemoveData} = require('./DataWork/callsOptions');
const passport = require('passport')

server.use(CORSES);
server.use(URLENCODER);
server.use(passport.initialize());
require('./Passport/passport')(passport);
server.use('/calendar', calendarRouter);
server.use('/auth', authRouter)

server.listen(PORT, async () => {
    console.log(`Server has been started on port ${PORT}`);
    await mongoose.connect('mongodb://localhost:27017/Calls')
    setInterval(() => {
        let now = DateTime.local().toLocal('ru');
        if ((now.toFormat('HH:mm') === '22:00')) {
            console.log('wake up')
            RemoveData(CallsOBJ.dynamic);
        }
    }, 50000)
});