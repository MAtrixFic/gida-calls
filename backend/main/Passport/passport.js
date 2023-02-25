const { Strategy, ExtractJwt } = require('passport-jwt');
const ShcoolBell = require('../DataWork/shcoolBellClass');
const opsions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'suck-jwt'
}

module.exports = passport => {
    passport.use(
        new Strategy(opsions, (payload, done) => {
            const authConnection = new ShcoolBell();
            authConnection.SelectUserPassport({ username: payload.username }).then(result => {
                if (result) {
                    done(null, result);
                }
                else {
                    done(null, false);
                }
            })
        })
    )
}               