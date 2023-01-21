const express = require('express');
const server = express();
const {PORT, URLENCODER, CORSES} = require('./mainOptions')
const calendarRouter = require('./Routes/routesCalendar');
const { DateTime } = require('luxon');
const Calls = require('./DataWork/calls')

server.use(CORSES);
server.use(URLENCODER);
server.use('/calendar', calendarRouter);

server.listen(PORT, () => {
    console.log("server has been started");
    setInterval(() => {
        let now = DateTime.local().toLocal('ru');
        if ((now.toFormat('HH:mm') === '22:00')) {
            console.log('wake up')
            const rem = new Calls(Calls.Schemas.dynamic, 'dynamic', Calls.collectionsName.dynamic)
            rem.ConnectToRemove()
        }
    }, 50000)
});