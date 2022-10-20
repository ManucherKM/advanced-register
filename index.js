import * as dotenv from "dotenv"; dotenv.config();
import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./routes/routes.js";
const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", router)

const start = async () => {
    try {
        await mongoose.connect(process.env.URL_DB).then(() => console.log(`Подключение к БД прошло успешно`))

        app.listen(PORT, (e) => {
            if (e) {
                console.log("Ошибка запуска сервера")
                return
            };
            console.log(`Сервер запустился на ${PORT} порту`)
        })
    } catch (e) {
        console.log(e);
    }
}

start()