import React from "react";
import {Route,BrowserRouter,Routes} from 'react-router-dom'
import LoginPage from "../pages/loginPage";
import RegisterPage from "../pages/registerPage";
import HomePage from "../pages/homePage";
import ProjectPage from "../pages/projectPage";
import UserAuth from "../auth/userAuth";
export const AppRoutes=function(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserAuth><HomePage/></UserAuth>}></Route>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/register" element={<RegisterPage/>}></Route>
                <Route path="/project" element={<UserAuth><ProjectPage/></UserAuth>}></Route>
            </Routes>
        </BrowserRouter>
    )
}   