const authRouter = require('express').Router();
const ShcoolBell = require('../DataWork/shcoolBellClass');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

authRouter.post('/log', async (req, res) => {
    const { username, password } = req.body;
    const authConnection = new ShcoolBell();
    authConnection.SelectUser({ username }).then(result => {
        if (result[0] === undefined) {
            res.send({
                res: 'Неверные данные!',
                status: 'unauthenticated'
            })
        }
        else {
            if (bcrypt.compareSync(password, result[0].userPassword)) {
                const token = jwt.sign({ role: result[0].role, username: result[0].userName }, 'suck-jwt', { expiresIn: 3600 })
                res.status(200).json({
                    res: `Bearer ${token}`,
                    status: 'authenticated'
                })
            }
            else {
                res.send({
                    res: 'Неверные данные!',
                    status: 'unauthenticated'
                })
            }
        }
    })
})

module.exports = authRouter