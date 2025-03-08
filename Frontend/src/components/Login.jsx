import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handlError, handleSuccess } from '../utils';

const Login = () => {
  const [loginInfo , setloginInfo] = useState({
    email:'',
    password:'',
  
  });
  
    const navigate = useNavigate();
     const navigate2 = useNavigate ();

    const handleSwtichtoSignup = () => {
        navigate('/sign');

    }
        const handleChange = (e) =>{
          const {name , value} = e.target;
        
          const  copyloginInfo = {...loginInfo};
          copyloginInfo[name] = value;
          setloginInfo(copyloginInfo);
    
        }
        
    
        const handlelogin= async(e) =>{
          e.preventDefault();
          
        const { email , password} = loginInfo;
        if( !email || !password){
          alert('Please fill in all fields');
        }
    
    try{
      const url = "https://notes-tasking-app-nh1p.vercel.app/auth/login";
      const response = await fetch(url,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginInfo)
          
        })
        const result = await response .json();
        const {jwtToken , name ,success , message , error} = result;
        if(success ){
              handleSuccess(message);

        localStorage.setItem('token',jwtToken);
        localStorage.setItem('loggedInuser',name);

        setTimeout(() =>{
          navigate2('/notes');
        },1000)
      }
  else if(error){
    const details =  error?.details[0].message;
    handlError(details);
   } 
   else if(!success){
    handlError(message);
   }
  
     
  }catch (err){
    handlError(err);
  
  
  }}
      
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
        <form className="space-y-6" onSubmit={handlelogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
            onChange={handleChange}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={loginInfo.email}
              autoFocus
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
            onChange={handleChange}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={loginInfo.password}
              autoFocus
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign In
            </button>
          </div>
        </form>
        <ToastContainer/>
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-gray-400 hover:text-gray-200">
            Forgot your password?
          </a>
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-400">Don't have an account? </span>
          <button className="text-sm text-blue-500 hover:text-blue-400" onClick={handleSwtichtoSignup}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;