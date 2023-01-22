const authRouter = require('express').Router();
const { GetData, CallsOBJ } = require('../DataWork/callsOptions');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

authRouter.post('/log', async (req, res) => {
    const { username, password } = req.body;
    GetData(CallsOBJ.users, { username: username }).then(result => {
        if (result !== null) {
            if (bcrypt.compareSync(password, result.password)) {
                const token = jwt.sign({ id: result._id, username: result.username }, 'suck-jwt', { expiresIn: 3600 })
                res.status(200).json({
                    res: `Bearer ${token}`,
                    status: 'authenticated'
                })
            }
            else {
                res.send({
                    res: 'Неправильный Пароль',
                    status: 'unauthenticated'
                })
            }
        }
        else {
            res.send({
                res: 'Неправильный Логин',
                status: 'unauthenticated'
            })
        }
    });
})

module.exports = authRouter