import userModel from "../models/usermodel.js";
import * as userServices from "../services/user.service.js"
import { body, validationResult } from "express-validator";
export const CreateUserController= async (req,res)=>{
    let errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({errors: errors.array()});
    }
    try {
        console.log(req.body);
        let user= await userServices.CreateUser(req.body);
        console.log("user created");
        console.log(user);
        let token=  user.generateJwt();
        res.status(201).json({user,token})
    } 
    catch (error) {
        console.error("Error creating user:", error.message);
        res.status(401).json({error: error.message});
    }
}

