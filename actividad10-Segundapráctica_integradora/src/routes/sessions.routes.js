import { Router } from "express";
import UsersMongoManager from "../dao/managers/mongo/usersMongo.manager.js";
import { hashPassword, isValidPassword } from "../utils/hash.js";
import generateToken from "../utils/jsonwebtoken.js";


const router = Router();
const usersMongoManager = new UsersMongoManager();

router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, cartId, role, active } = req.body;
        if(!password) return res.status(400).json({ message: 'Password is required' });

        const user = {
            first_name,
            last_name,
            email,
            age,
            password: hashPassword(password),
            cartId,
            role,
            active
        };

        await usersMongoManager.create(user)
        res.send({status: 'success' , token, data: user});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) return res.status(400).json({ message: 'Email and password are required' });

        const user = await usersMongoManager.getByEmail(email);
        if(!user) return res.status(400).json({ message: 'Email or password invalid' });

        if(!isValidPassword(password, user.password)) return res.status(400).json({ message: 'Email or password invalid' });
        const token = generateToken({uid: user.uid, role: user.role, email});
        res.cookie('cookieToken', token, {maxAge: 60*60*1000*24, httpOnly: true}).send({status: 'success' , token, data: user});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
});

router.post('/logout', (req, res) => {
    try {
        res.clearCookie('cookieToken').send('logout success');
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
});


export default router;