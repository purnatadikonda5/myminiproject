import "dotenv/config";
import morgan from "morgan";
import express, { urlencoded } from "express";
import cors from "cors";
import connect from "./db/db.js";
import userRoutes from "./routers/user.routes.js";
import cookieParser from "cookie-parser";
import projectRoutes from './routers/projects.routes.js'
const app = express();
connect();

app.use(cors({  
    origin: "http://localhost:5173",  
    credentials: true,  
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use("/projects/",projectRoutes)
app.use("/users/", userRoutes);

app.get("/", (req, res) => {
    res.send("hai");
});

export default app;
