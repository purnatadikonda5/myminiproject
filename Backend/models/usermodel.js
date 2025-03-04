import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
let UserSchema= mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:[6,"EMAIL SHOULD BE ATLEAST MORE THAN 6 CHARACTERS"],
        maxLength:[60,"password SHOULD BE ATLEAST MORE THAN 6 CHARACTERS"],
    },
    password:{
        type:String,
        required:true,
    }
})

UserSchema.statics.hashPassword= async (password)=>{
   return  await bcrypt.hash(password,10);
}
UserSchema.methods.isvalidPassword= async (password)=>{
   return  await bcrypt.compare(password,this.password);
}
UserSchema.methods.generateJwt = function () {
    return jwt.sign({ email: this.email }, process.env.SECRETE);
};
const User=mongoose.model("user",UserSchema);
export default User;