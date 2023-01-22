const exp = require('express');
const { GetData, SetData, CallsOBJ } = require('../DataWork/callsOptions');
const router = exp.Router();
const passport = require('passport');
const auth  = passport.authenticate('jwt', { session: false })

router.get('/static', auth, (req, res) => {
    console.log(req.query)
    GetData(CallsOBJ.static, { name: req.query.weekDay }).then(data => res.send(data));
});

router.get('/dynamic', auth, (req, res) => {
    console.log(req.query)
    const { weekDay, day, month, year } = req.query;
    GetData(CallsOBJ.dynamic, { date: `${year}-${month}-${day}` }).then(dataD => {
        if (dataD === null) {
            GetData(CallsOBJ.static, { name: weekDay }).then(dataS => {
                res.send(dataS);
            });
        }
        else {
            res.send(dataD)
        }
    });
});

router.put('/dynamic', auth ,(req, res) => {
    const { date, first, second } = req.body;
    SetData(CallsOBJ.dynamic, { date: date }, {
        date: date,
        time: {
            first: [...first.split(',')],
            second: [...second.split(',')]
        },
        type: 'dynamic'
    })
    res.sendStatus(200);
})

module.exports = router;