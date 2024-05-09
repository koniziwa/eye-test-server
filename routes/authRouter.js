import Router from "express";
import AuthController from "../controllers/AuthController.js";
import auth from "../middleware/auth.js";

const authRouter = new Router();

authRouter.post('/registration', AuthController.registration);

authRouter.post('/login', AuthController.login);

authRouter.post('/isTokenValid', AuthController.isTokenValid)

authRouter.get('/user', auth, AuthController.getUser);


export default authRouter;