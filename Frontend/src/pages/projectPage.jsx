import React from "react";
import { useLocation } from "react-router-dom";
function ProjectPage(){
    let location = useLocation();
    console.log(location.state)
    return <div>project</div>
}
export default ProjectPage;