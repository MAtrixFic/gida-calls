const express = require('express');
const cors = require('cors');
const calendarRouter = require('./Routes/routesCalendar');
const entRouter = require('./Routes/routesEntrance');
const server = express();
const { DateTime } = require('luxon');


const port = 3001;
const urlencode = express.urlencoded({ extended: true });


server.use(cors({
    origin: 'http://localhost:3000',
}));
server.use(urlencode);
server.use('/entrance', entRouter);
server.use('/calendar', calendarRouter);

server.listen(port, () => {
    console.log("server has been started");
    setInterval(()=>{
        let now = DateTime.local().toLocal('ru');
        if((now.toFormat('HH:mm') === '23:00')){
            console.log('wake up')
        }
    },50000)
})