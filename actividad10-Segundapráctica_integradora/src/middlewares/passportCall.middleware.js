import passport from 'passport';

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function(err, user, info) {
            if (err) return next(err);
            if (!user) return res.status(401).json({ status: 'error', error: info.message ? info.message : 'Unauthorized'});
            req.user = user;
            next();
        })
    }
}