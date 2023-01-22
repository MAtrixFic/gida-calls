const { Strategy, ExtractJwt } = require('passport-jwt');
const {CallsOBJ, GetData} = require('../DataWork/callsOptions');
const opsions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'suck-jwt'
}

module.exports = passport => {
    passport.use(
        new Strategy(opsions, (payload, done)=>{
            GetData(CallsOBJ.users, {_id: payload.id}).then(data=>{
                if(data !== null){
                    done(null, data);
                }
                else{
                    done(null, false);
                }
            })
        })
    )
}