import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secret } from "../private/config.js"

const generateAccessToken = (id) => {
    const payload = {
        id,
    }
    return jwt.sign(payload, secret);
}

class AuthController {
    async registration(req, res) { 
        try {
            const {username, email, password} = req.body;
            const candidateUsername = await User.findOne({username});
            const candidateEmail = await User.findOne({email})
            if (candidateUsername) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует!"})
            }
            if (candidateEmail) {
                return res.status(400).json({message: "Пользователь с такой почтой уже существует"})
            }
            const hashedPassword = bcrypt.hashSync(password, 8);
            const user = new User({username, email, password: hashedPassword});
            await user.save();
            return res.json({message: "Пользователь успешно зарегистрирован"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Неизвестная ошибка при регистрации"});
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                return res.status(400).json({message: "Пользователь с таким именем не найден"});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: "Неправильный пароль"});
            }
            const token = generateAccessToken(user._id);
            return res.json({token});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Неизвестная ошибка при попытке войти"});
        }
    }

    async isTokenValid(req, res) {
        try {
            const token = req.header('x-auth-token');
            if (!token) return res.json(false);
            const verified = jwt.verify(token, secret);
            if (!verified) return res.json(false);
            const user = await User.findById(verified.id);
            if (!user) return res.json(false);
            res.json(true);
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    async getUser(req, res) {
        try {
            const user = await User.findById(req.user);
            res.json({ ...user._doc, token: req.token})
        } catch (e) {
            console.log(e);
        }
    }
}

export default new AuthController;