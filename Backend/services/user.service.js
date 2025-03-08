import userModel from "../models/usermodel.js";


export const CreateUser= async (rr)=>{
    console.log(rr);
    let email=rr.email,password=rr.password;
    if(! email ||! password){
        throw new Error("ENTER THE EMAIL OR PASSWORD");
    }
    let hashedPass=await userModel.hashPassword(password);
    console.log("creating user");
    const user= await userModel.create({
        email,
        password: hashedPass
    })
    console.log(user);
    return user;
}

export const getAllUsers = async({UserId})=>{
    let allusers= await userModel.find({
        _id: {$ne: UserId}
    })
    // console.log(allusers);
    return allusers;
}