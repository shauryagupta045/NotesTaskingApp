import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handlError, handleSuccess } from '../utils';

const SignUp = () => {
const [signupInfo , setsignupInfo] = useState({
  name:'',
  email:'',
  password:'',

});

  const navigate = useNavigate ();
  const navigate2 = useNavigate ();

  const  handleswtichforLogin = () =>{
    navigate('/login')

}
    const handleChange = (e) =>{
      const {name , value} = e.target;
      console.log(name,value);
      const  copysignupInfo = {...signupInfo};
      copysignupInfo[name] = value;
      setsignupInfo(copysignupInfo);

    }
    

    const handleSignup= async(e) =>{
      e.preventDefault();
      
    const {name , email , password} = signupInfo;
    if(!name || !email || !password){
      return handlError('Please fill all the fields');
    }

try{
  const url = "http://localhost:8080/auth/signup";
  const response = await fetch(url,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupInfo)
      
    });
    const result = await response .json();
    const {success , message , error}  = result;
    if(success ){
      handleSuccess(message);
   
    setTimeout(() =>{
      navigate2('/login');
    },1000)
 }else if(error){
  const details =  error?.details[0].message;
  handlError(details);
 } 
 else if(!success){
  handlError(message);
 }

    console.log(result);
}catch (err){
  handlError(err);


}}

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign Up</h2>
        <form className="space-y-6" onSubmit={handleSignup}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
            onChange={handleChange}
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={signupInfo.name}
              autoFocus
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>
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
              value={signupInfo.email}
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
              value={signupInfo.password}
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
              Create Account
            </button>
          </div>
        </form>
        <ToastContainer />

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-400">Already have an account? </span>
          <button className="text-sm text-blue-500 hover:text-blue-400" onClick={handleswtichforLogin}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;