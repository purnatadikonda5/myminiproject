import mongoose from "mongoose";

let projectSchema= mongoose.Schema({
    name:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ]
})

const ProjectModel = mongoose.model("project",projectSchema);
export default ProjectModel;