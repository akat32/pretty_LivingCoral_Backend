import passport from 'passport'
import passportLocal from 'passport-local'

const LocalStrategy = passportLocal.Strategy

module.exports = ( Users ) => {
    // passport serialize
    passport.serializeUser((user, done)=>{
        done(null, user)
    })
    passport.deserializeUser((obj, done)=>{
        done(null, obj)
    })
    passport.use( new LocalStrategy ({
            usernameField: 'id',
            passwordField: 'passwd',
            session: true,
            passReqToCallback: false,
        }, async (id, passwd, done)=> {
            let user = await Users.find({id : id, passwd: passwd})
            if(!user) return done({message : "아이디나 비밀번호가 틀렸습니다."}, false, null)
            else return done(null, user)
        }
    ))
    return passport
}