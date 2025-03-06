import React, { useContext, useState ,useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "../configs/axios";
import { UserContext } from "../contexts/user.context";
export default function HomePage() {
    let { user } = useContext(UserContext);
    let [projectName, setProjectName] = useState('');
    let [isModalOpen, setIsModalOpen] = useState(false);
    let [project,setProject]= useState(null);
    let navigate=useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        axios.post("/projects/create", {
            name: projectName
        }).then(() => {
            setProjectName("");
            setIsModalOpen(false);
        }).catch((error) => console.error(error));
    }
    function handleClose() {
        setIsModalOpen(false);
    }
    useEffect(()=>{
        axios.get("/projects/all").then((res)=>{
            console.log(res.data.allProjects);
            setProject(res.data.allProjects);
        }).catch((err)=>console.log(err));
    },[])
    return (
        <main className="p-4">
            <div className="projects flex flex-wrap gap-6">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-4 bg-slate-200 rounded-2xl  transition-transform duration-300 transform hover:scale-110 cursor-pointer mr-12 ml-12 border-4 border-transparent rounded-md transition-all duration-300 transform hover:scale-[1.3] hover:border-purple-600"
                >
                    Create Project<i className="ri-link ml-2"></i>
                </button>
                {
                    (project!=null &&
                    (project.map((pro)=>{
                        return <div key={pro._id} 
                        onClick={()=>{
                            navigate("/project",{
                            state: {pro}
                        })}}
                        className="p-4 border-4 flex flex-col text-2xl min-w-52 border-black bg-green-500 rounded-2xl cursor-pointer transition-transform duration-300 transform hover:scale-115">
                            
                            <h2 className="font-semibold text-4xl text-blue-600">{pro.name.charAt(0).toUpperCase() + pro.name.slice(1)}</h2>
                            <div className="flex gap-4 mt-2">
                                <p><i className="ri-group-fill mr-2"></i><small>Colaborators:</small> {pro.users.length}</p>
                            </div>
                        </div>;
                    })))
                }
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
                            <form onSubmit={handleSubmit}>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Project Name
                                </label>
                                <input
                                    type="text"
                                    value={projectName} name="name"
                                    onChange={(e) => setProjectName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Enter project name"
                                    required
                                />
                                <div className="flex justify-end mt-4">
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
