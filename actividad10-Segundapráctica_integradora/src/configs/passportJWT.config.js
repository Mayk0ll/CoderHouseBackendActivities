import passport from 'passport';
import passportJWT from 'passport-jwt';

const jwtStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) token = req.cookies['cookieToken'];
    return token;
};

const initializePassportJWT = () => {
    passport.use('jwt',new jwtStrategy({
        jwtFromRequest: extractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET
    }, async (payload, done) => {
        try {
            console.log(payload);
            return done(null, payload.user);
        } catch (error) {
            done(error);
        }
    }));


}

export default initializePassportJWT;