import mongoose from "mongoose";
import ProjectModel from "../models/projectsmodel.js";
export  async function CreateProject({name,UserId}){

    console.log(name,UserId)
    if(!name){
        throw new Error("Name is required");
    }
    if(!UserId){
        throw new Error("Name is required");
    }
    try {
        let project= await ProjectModel.create({
            name,
            users:[UserId]
        })  
        if(!project) throw new Error("no project");
        return project;
    } catch (error) {
        if(error.code=='11000'){
            throw new Error("Project name already exists")
        }
        else throw error;
    }
}
export const getAllprojectsByUserID= async ({UserId})=>{
    console.log(UserId);
    if(!UserId){
        throw new Error("UserId is required")
    }
    try {
        let allProjects= await ProjectModel.find({
            users:{
                $in:[UserId]
            }
        })
        console.log(allProjects);
        return allProjects;
    } catch (error) {
        console.log(error);
        return;
    }
}

export const addUsertoProject= async ({projectId,users,UserId})=>{
    if(!projectId){
        throw new Error("projectId is required")
    }
    if(!UserId){
        throw new Error("UserId is required")
    }
    if(!users){
        throw new Error("users array is required")
    }
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("project id should be a valid mongoose Id")
    }
    if(!mongoose.Types.ObjectId.isValid(UserId)){
        throw new Error("UserId should be a valid mongoose Id")
    }
    if(!Array.isArray(users) || users.some((user)=>!mongoose.Types.ObjectId.isValid(user))){
        throw new Error("users elements should should be a valid mongoose Ids")
    }
    UserId=UserId.toString();projectId=projectId.toString();
    console.log(projectId,UserId);
    let newpro= await ProjectModel.findOne({
        _id:projectId,
        users: { $in: [UserId]}
    });
    console.log(newpro);
    if(!newpro){
        throw new Error("User doesn't belogs to the project to add");
    }
    users.push(UserId);
    const newproject= await ProjectModel.findByIdAndUpdate(
        {_id:projectId},
        {$set:{users:users}},
        {new:true}
    )
    console.log(newproject);
    return newproject
}

export const getProjectById = async ({projectId})=>{
    if(!projectId){
        throw new Error("project Id is required");
    }
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error("ProjectId should be mongoose obj Id");
    }
    try {       
        let project= await ProjectModel.findOne({_id:projectId}).populate('users');
        return project;
    } catch (error) {
        console.log(error);
    }
}   