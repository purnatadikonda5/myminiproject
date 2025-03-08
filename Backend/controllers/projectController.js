import ProjectModel from "../models/projectsmodel.js";
import * as ProjectServices from '../services/project.service.js'
import userModel from "../models/usermodel.js";
import { validationResult } from "express-validator";
import { LogoutController } from "./UserController.js";


export const CreateProjectController= async (req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        throw new Error("validation failed")
    }
    try {
        let {name}=req.body
        let user=req.user
        let loggedInUser= await userModel.findOne({email:user.email});
        let UserId=loggedInUser._id;
        console.log(loggedInUser);
        const newproject= await ProjectServices.CreateProject({name,UserId})
        res.status(200).json(newproject);
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error.message});
    }
}   

export const getAllprojects= async (req,res)=>{
    try {
        console.log(req.user.email);
        let loggedInUser= await userModel.findOne({email:req.user.email});
        let UserId=loggedInUser._id.toString();
        console.log("i am userid ",UserId);
        let allProjects= await ProjectServices.getAllprojectsByUserID({UserId});
        return res.status(200).json({allProjects})
    } catch (error) {
        console.log(error);
        return res.status(400).json({error:error.message});
    }
}

export const addUsertoProject= async (req,res)=>{
    console.log(req.body);
    let errors=validationResult(req);
    if(!errors.isEmpty()){
        throw new Error("validation failed")
    }
    try {
        const {projectId,users} =req.body;
        let loggedInUser=await userModel.findOne({email:req.user.email});
        let UserId=loggedInUser._id;
        console.log(UserId,loggedInUser);
        let newpro= await ProjectServices.addUsertoProject({projectId,users,UserId});
        console.log(newpro);
        if(!newpro){
            throw new Error("no project found");
        }
        return res.status(200).json(newpro);
    } catch (error) {
        res.status(401).json({error:error.message});
    }
}

export const getProject=async (req,res)=>{
    let {projectId}= req.params;
    console.log(projectId);
    try {
        let project= await ProjectServices.getProjectById({projectId});
        return res.status(200).json(project);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({error:error.message});
    }
}