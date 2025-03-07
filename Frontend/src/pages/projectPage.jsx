import React,{useState} from "react";
import { useLocation } from "react-router-dom";
// import UserSelectionModal from '../comps/UsersModals'
function ProjectPage(){
    let location = useLocation();
    let [isSidepannelOpen,setisSidepannelOpen]=useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    console.log(location.state);
    const users = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
        { id: 4, name: "David" },
    ];
    return (
        <main className="h-screen w-screen font-mono">
            <section className="left h-full min-w-110 bg-black flex flex-col max-w-120 relative">
                <header className="flex justify-between p-4 w-full h-16 bg-blue-500">
                <button className="p-2 cursor-pointer " onClick={()=>{setIsModalOpen(true)}} >
                <i className="ri-user-add-fill text-2xl">Add</i>
                </button>
                <button className="p-2 cursor-pointer" onClick={()=>{return setisSidepannelOpen(!isSidepannelOpen)}} >
                    <i className="ri-group-fill text-2xl "></i>
                </button>
                </header>
                <div className="conversationBlock flex-grow flex flex-col">
                    <div className="messageBox flex-grow flex flex-col p-1 gap-1">
                        <div className="incomming-message p-2 flex flex-col border rounded-2xl p-2 bg-purple-400 max-w-2/3">
                            <small className="opacity-65 text-emerald-900">hehe@hehe.com</small>
                            <p>Hehe nene ra hehe em chestav ra nuvvu ninnu kodithe </p>
                        </div>
                        <div className="ml-auto outgoing-message p-2 flex flex-col border rounded-2xl p-2 bg-sky-400 max-w-2/3">
                            <small className="opacity-65 text-pink-600">haha@haha.com</small>
                            <p>Haha, nenu dorakanu ga ..</p>
                        </div>
                        <div className="ml-auto outgoing-message p-2 flex flex-col border rounded-2xl p-2 bg-sky-400 max-w-2/3">
                            <small className="opacity-65 text-pink-600">haha@haha.com</small>
                            <p>Haha, nenu dorakinappudu chuddam le ra bot ga mundu poi chaduko</p>
                        </div>

                    </div>
                    <div className="inputfield h-15 rounded-2xl bg-teal-300  flex flex-row overflow-hidden">
                        <input type="text" className="text-1.2xl p-2 px-4 border-none outline-none w-full flex max-w-full" placeholder="Enter Your Message " name="messageBox"/>
                        <button className="sendBut rounded-2xl w-20 flex-grow  transition-transform duration-300 transform hover:scale-110 cursor-pointer"><i className="ri-send-plane-fill text-3xl"></i></button>
                    </div>
                </div>

                <div className={`sidepannel w-full h-full bg-pink-500 absolute transition duration-300 ${isSidepannelOpen ? 'translate-x-0':'-translate-x-full'}`}>
                    <header className="flex justify-end p-4 w-full h-16 bg-blue-500">
                    <button className="p-1 px-2 cursor-pointer hover:bg-zinc-300 rounded-full flex w-fit h-fit" onClick={()=>{return setisSidepannelOpen(!isSidepannelOpen)}} >
                        <i class="ri-close-circle-fill text-2xl"></i>
                    </button>
                </header>
                <div className="users flex flex-col gap-2">
                    <div className="user flex p-4 cursor-pointer items-center gap-3 hover:bg-pink-400 ">
                        <div className="aspect-square rounded-full p-6 bg-green-500 hover:bg-green-300  w-fit h-fit flex items-center justify-center">
                            <i class="ri-user-fill position absolute"></i>
                        </div>
                    <p>SaiRam</p>
                    </div>
                    <div className="user flex p-4 cursor-pointer items-center gap-3 hover:bg-pink-400 ">
                        <div className="aspect-square rounded-full p-6 bg-green-500  hover:bg-green-300 w-fit h-fit flex items-center justify-center">
                            <i class="ri-user-fill position absolute"></i>
                        </div>
                    <p>Radika</p>
                    </div>
                    <div className="user flex p-4 cursor-pointer items-center gap-3 hover:bg-pink-400 ">
                        <div className="aspect-square rounded-full p-6 bg-green-500  hover:bg-green-300 w-fit h-fit flex items-center justify-center">
                            <i class="ri-user-fill position absolute"></i>
                        </div>
                    <p>Riya</p>
                    </div>
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
                                    key={user.id}
                                    onClick={() => setSelectedUserId(user.id)}
                                    className={`flex items-center p-3 border rounded-md cursor-pointer transition-all ${
                                        selectedUserId === user.id
                                            ? "bg-blue-500 text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                                >
                                    <div className="w-10 h-10 bg-amber-300 rounded-full flex items-center justify-center font-semibold text-black">
                                        {user.name.charAt(0)}
                                    </div>
                                    <p className="ml-3">{user.name}</p>
                                </div>
                            ))}
                        </div>
        
                        {/* Buttons */}
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    console.log("Selected User ID:", selectedUserId);
                                    onClose();
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                disabled={!selectedUserId}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>)
            }
            
        </main>
    )
}
export default ProjectPage;