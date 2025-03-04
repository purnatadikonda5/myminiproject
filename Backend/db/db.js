import mongoose from "mongoose";
let MONGOURI=process.env.MONGOURI
function connect(){ 
    mongoose.connect(MONGOURI).then(()=>{
        console.log("connected to database");
    })
    .catch(err=>{
        console.log("the error is " ,err)
    })
}
export default connect;