import jwt from "jsonwebtoken";
import { secret } from "../private/config.js"

const auth = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) 
            return res.status(401).json({message: 'Нет токена'});

        const verified = jwt.verify(token, secret);
        if (!verified)
            return res.status(401).json({message: "Токен не прошёл проверку"});

        req.user = verified.id;
        req.token = token;
        next();
    } catch (e) {
        res.status(500).json({error: e.message});
    }
};

export default auth;