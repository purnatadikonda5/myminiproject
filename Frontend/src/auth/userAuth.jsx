import { useState ,useContext, useEffect } from "react";
import { UserContext } from "../contexts/user.context";
import { useNavigate } from "react-router-dom";
const UserAuth =({children})=>{
    const [loading,setloading]=useState(true);
    let token=localStorage.getItem('token');
    let {user}=useContext(UserContext);
    let navigate=useNavigate();
    useEffect(()=>{
        if(user){
            setloading(false);
        }
        if(!user || !token){
            navigate('/login');
        }
    },[])
    if(loading){
        return <div>Loading....</div>;
    }
    return (
    <>
        {children}
    </>
    );
}

export default UserAuth;