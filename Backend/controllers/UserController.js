import userModel from "../models/usermodel.js";
import * as userServices from "../services/user.service.js"
import { body, validationResult } from "express-validator";
import redisClient from "../redis/redis.sevice.js";
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
        delete user._doc.password;
        res.status(201).json({user,token})
    } 
    catch (error) {
        console.error("Error creating user:", error.message);
        res.status(401).json({error: error.message});
    }
}

export const LoginController=async(req,res)=>{
    let errors= validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new Error("Login validation failed");
    }
    try {
        let {email,password}= req.body;
        let user=await userModel.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({error:"invalid credentials"})
        }
        let match=user.isValidPassword(password);
        if(!match){
            return res.status(401).json({error:"invalid credentials"})
        }
        let token=user.generateJwt();
        delete user._doc.password;
        res.status(201).json({user,token});
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(401).json({error:error.message});
    }
}

export const ProfileController= async function(req,res){
    console.log(req.user);
    res.status(201).json({
        user:req.user
    });
}

export const LogoutController= async function (req,res){
    try {
        let token= req.cookies.token || req.headers.authorization.split(' ')[1];
        redisClient.set(token,'Logout','Ex',60*60*24);
        res.status(200).json({
            message:"LOGGED OUT SUCCESSFULLY"
        })
    } catch (error) {
        console.log(error);
        res.status(401).json({error:error.message});
    }
}

export const getAllUsersController= async (req,res)=>{
    try {
        let loggedInUser= await userModel.findOne({email:req.user.email});
        let UserId= loggedInUser._id;
        let allUsers= await userServices.getAllUsers({UserId});
        return res.status(200).json(allUsers);
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}