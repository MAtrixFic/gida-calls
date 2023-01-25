const { Strategy, ExtractJwt } = require('passport-jwt');
const ShcoolBell = require('../DataWork/shcoolBellClass');
const opsions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'suck-jwt'
}

module.exports = passport => {
    passport.use(
        new Strategy(opsions, (payload, done)=>{
            const authConnection = new ShcoolBell('localhost', 'MAtrix', 'M1000110Atrix', 'school_bell').connection;
            authConnection.query(`SELECT * FROM users WHERE userName = "${payload.username}"`,(err, result)=>{
                if(result){
                    done(null, result);
                }
                else{
                    done(null, false);
                }
            })
        })
    )
}