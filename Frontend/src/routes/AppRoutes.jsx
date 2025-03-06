import React from "react";
import {Route,BrowserRouter,Routes} from 'react-router-dom'
import LoginPage from "../pages/loginPage";
import RegisterPage from "../pages/registerPage";
import HomePage from "../pages/homePage";
import ProjectPage from "../pages/projectPage";
export const AppRoutes=function(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/register" element={<RegisterPage/>}></Route>
                <Route path="/project" element={<ProjectPage/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}   