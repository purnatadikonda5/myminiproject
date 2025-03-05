import  "dotenv/config";
import morgan from "morgan";
import express, { urlencoded } from "express";
import connect from "./db/db.js";
import userRoutes from "./routers/user.router.js";
import cookieParser from "cookie-parser";
const app= express();
connect();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
app.use("/users/",userRoutes);
app.get("/",(req,res)=>{
    res.send("hai");
})
export default app;