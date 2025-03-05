// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div className='w-screen h-screen bg-gray-400'>
//         <div cla></div>
//       </div>
        
//     </>
//   )
// }

// export default App

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with", { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-96 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-center text-2xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-4">Login to your account</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition shadow-sm">Login</button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account? <a href="#" className="text-blue-600 font-semibold">Sign up</a>
        </p>
      </div>
    </div>
  );
}