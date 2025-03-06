import { Link, useNavigate } from "react-router-dom";
import axios from "../configs/axios";
import React, { useState ,useContext} from 'react';
import { UserContext } from "../contexts/user.context";

export default function RegisterPage() {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');
  const {setUser} =useContext(UserContext);
  let navigate=useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if(confirmPassword!=password){
      alert("password and confimed password are not same");
      return;
    }
    axios.post("/users/register", {
      email,password
    }).then((res) => {
      localStorage.setItem('token',res.data.token)
      setUser(res.data.user)
      console.log(res.data)
      navigate("/")
    }).catch(e => console.log(e));
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative w-1/3 h-[70vh] p-12 bg-gray-800 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500 hover:scale-105">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2">Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email"
              className="w-full p-3 text-white bg-gray-700 rounded-lg outline-none border-2 border-transparent focus:border-purple-400 focus:ring-4 focus:ring-purple-300 shadow-md transition-all duration-300 hover:shadow-purple-500 hover:border-purple-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2">Password</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password"
              className="w-full p-3 text-white bg-gray-700 rounded-lg outline-none border-2 border-transparent focus:border-purple-400 focus:ring-4 focus:ring-purple-300 shadow-md transition-all duration-300 hover:shadow-purple-500 hover:border-purple-400"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2">Confirm Password</label>
            <input
              type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="confirmPassword"
              className="w-full p-3 text-white bg-gray-700 rounded-lg outline-none border-2 border-transparent focus:border-purple-400 focus:ring-4 focus:ring-purple-300 shadow-md transition-all duration-300 hover:shadow-purple-500 hover:border-purple-400"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-600 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-500 hover:shadow-lg"
          >
            Register
          </button>
        </form>
        <p className="text-white text-center mt-4">
          Already have an account? <Link to="/login" className="text-purple-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}