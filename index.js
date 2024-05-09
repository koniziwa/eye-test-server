import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRouter from "./routes/authRouter.js";
import testRouter from "./routes/testRouter.js";

const PORT = 5000;
const DB_URL = 'mongodb://localhost:27017';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/test', testRouter);
app.use('/auth', authRouter);


app.get('/', (req, res) => {
    res.status(200).json('SERVER IS WORKING');
});

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {
            dbName: 'eyeTestDataBase',
        });
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

startApp();
