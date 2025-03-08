import jwt from 'jsonwebtoken'
import redisClient from '../redis/redis.sevice.js';
import { rmSync } from 'fs';
export const authUser=async  function (req,res,next){
    try {
        console.log(req);
        let token= req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({error:"Unauthorized User : no token"});
        }
        let isbalcklisted= await redisClient.get(token);
        if(isbalcklisted){
            res.cookie('token','');
            return res.status(401).json({error:"Unauthorized User"});
        }
        console.log(process.env.SECRETE);
        console.log(token);
        console.log(jwt.decode(token));
        let decodeddata=  jwt.verify(token,process.env.SECRETE);
        req.user=decodeddata;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({error:"Unauthorized User"});
    }
}