import React,{useState,useEffect, useContext} from "react";
import { useLocation } from "react-router-dom";
import axios from '../configs/axios'
import { initializeSocket ,receiveMessage,sendMessage} from "../configs/socket";
import { UserContext } from "../contexts/user.context";
function ProjectPage(){
    let location = useLocation();
    let [isSidepannelOpen,setisSidepannelOpen]=useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [users,setusers]= useState([]);
    let [project,setproject]=useState({});
    let [message,setmessage]= useState(null);
    let {user}= useContext(UserContext);
    let [messages,setmessages]= useState([]);
    let handleAddUsers= ()=>{
        axios.put('/projects/add-user',{
            projectId:location.state.pro._id,
            users:selectedUserIds
        }).then(res=>{
            // console.log(res);
        }).catch(err=>{
            console.log(err);
        })
    }
    function appendMessage(MessageObj){
        setmessages((prev)=>[...prev,MessageObj]);
    }
    let SendMsg =()=>{
        // console.log(message,user._id);
        sendMessage('project-message',{
            message,
            sender: user,
            // roomId: location.state.pro._id
        })
        setmessage('');
    }
    useEffect(()=>{
        initializeSocket({projectId:location.state.pro._id});
        axios.get(`/projects/get-project/${location.state.pro._id}`).then(res=>{
            setproject(res.data); 
        }).catch(err=>{
            console.log(err);
        })
        axios.get('/users/all').then(res=>{
            setusers(res.data);
            
        }).catch(err=>{
            console.log(err);
        })
        receiveMessage('project-message',data=>{
            // console.log(data);
            appendMessage(data);
        })
    },[])
    return (
        <main className="h-screen w-screen font-mono p-0 m-0">
            <section className="left h-screen min-w-110  bg-black flex flex-col max-w-120 max-h-screen relative">
                <header className="flex justify-between p-4 w-full h-16 bg-blue-500 absolute top-0">
                <button className="p-2 cursor-pointer " onClick={()=>{setIsModalOpen(true)}} >
                <i className="ri-user-add-fill text-2xl">Add</i>
                </button>
                <button className="p-2 cursor-pointer" onClick={()=>{return setisSidepannelOpen(!isSidepannelOpen)}} >
                    <i className="ri-group-fill text-2xl "></i>
                </button>
                </header>
                <div className="conversationBlock pt-16 flex-grow flex flex-col relative">
                    <div className="messageBox flex-grow flex flex-col p-1 gap-1 overflow-scroll py-16 ">
                        {messages.map((msg)=>console.log(msg.sender))}
                        {
                            messages && (
                                messages.map((msg)=>{
                                    if(msg.sender._id == user._id){
                                        return (
                                            <div className="ml-auto outgoing-message p-2 flex flex-col border rounded-2xl  bg-sky-400 max-w-2/3">
                                                <small className="opacity-65 text-pink-600">{user.email}</small>
                                                <p>{msg.message}</p>
                                            </div>
                                        )
                                    }
                                    else {return (
                                        <div className="incomming-message p-2 flex flex-col border rounded-2xl  bg-purple-400 max-w-2/3">
                                            <small className="opacity-65 text-emerald-900">{msg.sender.email}</small>
                                            <p>{msg.message}</p>
                                        </div>
                                    )}
                                })
                            )
                        }

                    </div>
                    <div className="inputfield h-15 w-full rounded-2xl bg-teal-300  flex flex-row absolute bottom-0">
                        <input type="text" value={message} onChange={(e)=>{return setmessage(e.target.value)}} className="text-1.2xl p-2 px-4 border-none outline-none w-full flex max-w-full" placeholder="Enter Your Message " name="messageBox"/>
                        <button 
                                onClick={SendMsg}
                        className="sendBut rounded-2xl w-20 flex-grow  transition-transform duration-300 transform hover:scale-110 cursor-pointer"><i className="ri-send-plane-fill text-3xl"></i></button>
                    </div>
                </div>
                <div className={`sidepannel w-full h-full bg-pink-500 absolute transition duration-300 ${isSidepannelOpen ? 'translate-x-0':'-translate-x-full'}`}>
                    <header className="flex justify-between items-center p-4 w-full h-16 bg-blue-500">
                    <h2 className="text-3xl">Colaborators</h2>
                    <button className="p-1 px-2 cursor-pointer hover:bg-zinc-300 rounded-full flex w-fit h-fit" onClick={()=>{return setisSidepannelOpen(!isSidepannelOpen)}} >
                        <i class="ri-close-circle-fill text-2xl"></i>
                    </button>
                </header>
                <div className="users flex flex-col gap-2">
                    {
                        project.users && (
                            project.users.map(username=>{
                                return (
                                    <div key={username._id} className="user flex p-4 cursor-pointer items-center gap-3 hover:bg-pink-400 ">
                                        <div className="aspect-square rounded-full p-6 bg-green-500 hover:bg-green-300  w-fit h-fit flex items-center justify-center">
                                            <i class="ri-user-fill position absolute"></i>
                                        </div>
                                        <p>{username.email}</p>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
                </div>
            </section>
            {
                isModalOpen&&
                (<div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        
                        <h2 className="text-xl font-bold text-black">Select a User</h2>
        
                        <div className="mt-4 max-h-60 overflow-y-auto">
                            {users.map((user) => (
                                <div
                                    key={user._id}
                                    onClick={function ff(){
                                        if(selectedUserIds.indexOf(user._id)==-1)setSelectedUserIds([...selectedUserIds,user._id]);
                                        else {
                                            setSelectedUserIds(selectedUserIds.filter(id=>id!=user._id));
                                        }
                                    }}
                                    className={`flex items-center p-3 border rounded-md cursor-pointer transition-all ${
                                            (selectedUserIds.indexOf(user._id)!=-1)
                                            ? "bg-blue-500 text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                                >
                                    <div className="w-10 h-10 bg-amber-300 rounded-full flex items-center justify-center font-semibold text-black">
                                        {user?.email?.charAt(0)}
                                    </div>
                                    <p className="ml-3">{user.email}</p>
                                </div>
                            ))}
                        </div>
        
                        {/* Buttons */}
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={() => {setIsModalOpen(false);setSelectedUserIds([])}}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    console.log("Selected User ID:", selectedUserIds);
                                    handleAddUsers();
                                    setIsModalOpen(false);
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                disabled={!selectedUserIds}
                            >
                                AddColaborator
                            </button>
                        </div>
                    </div>
                </div>)
            }
            
        </main>
    )
}
export default ProjectPage;