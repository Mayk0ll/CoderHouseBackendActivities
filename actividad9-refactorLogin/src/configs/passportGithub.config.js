import passport from 'passport';
import GithubStrategy from 'passport-github2';
import UsersManager from '../dao/managers/mongo/usersMongo.manager.js';

const usersManager = new UsersManager();

//Declaracion de una estrategia
//passport.use('nombreEstrategia', new LocalStrategy({}, async() => {}));

const initializePassportGithub = () => {
    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.4a7201d5ba85f772',
        clientSecret: '3f1e62f80310921637deacb47e0412e2ce76daca',
        callbackURL: 'http://localhost:8080/api/auth/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const {name, email, login} = profile._json; 
            const user = await usersManager.getByEmail(email? email : login);
            if (!user) {
                const newUser = await usersManager.create({first_name: name, last_name: 'github', email: login, password: 'github'});
                return done(null, newUser);
            } else {
                return done(null, user);
            }
        } catch (error) {
            console.log(error)
            done(error);
        }
    }));
};

export default initializePassportGithub;
