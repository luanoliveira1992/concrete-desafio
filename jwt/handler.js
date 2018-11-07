const BearerStrategy = require('passport-http-bearer').Strategy;
const exception = require('../errors');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const passport = require('passport');



module.exports.setPassportStrategy = (passport) => {
    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
        secretOrKey: process.env.JWT_SECRET
    };

    passport.use(new BearerStrategy(opts, (req, payload, done) => {

        let decoded = jwt.verify(payload, process.env.JWT_SECRET);


        try {
            if (!decoded)
                throw new exception.Unauthorized();
            done(null, payload);
        } catch (error) {
            done(exception.getKnownError(error), false);
        }

    }));
}

module.exports.getToken = (id) => {
    let payload = { 'id': id };
    let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_TIMEOUT
    });

    return token;
};

module.exports.authenticate = (req, res, next) => {

    passport.authenticate('bearer', { session: false }, (err, token) => {
        if (err) next(err);

        if (!token)
            next(new exception.Unauthorized());

        req.token = token;
        return next();
    })(req, res, next);
};
