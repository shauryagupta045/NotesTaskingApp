import React from "react";
import { useNavigate } from "react-router-dom";
// Header Component
function Header() {
  const navigate2 = useNavigate();
  const navigate3 = useNavigate();

  const handleforLogin = () =>{
    navigate2("/login");
  }

  const handleforSign = ()  =>{
    navigate3("/sign");
  }


  return (
    <header className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Notezy</h1>
        <div className="flex space-x-4">
          <button className="text-white hover:text-gray-300 transition" onClick={handleforSign}>
            Sign Up
          </button>
          <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition" onClick={handleforLogin}>
            Login
          </button>
        </div>
      </div>
    </header>
  );
}

// Hero Component
function Hero() {

  const navigate = useNavigate();


  const handlego = () => {
    navigate("/notes");
  }

  
  return (
    <>
      <Header /> {/* Include the Header component here */}
      <section className="bg-black text-white min-h-screen flex items-center justify-center px-6 md:px-16 pt-20">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div>
            <h1 className="text-5xl font-bold leading-tight">
              All your notes. <br /> Organized. <br /> Effortless.
            </h1>
            <p className="text-gray-400 mt-4 text-lg">
              Inspiration strikes anywhere. Notezy lets you capture, organize, and
              share your ideas across any device.
            </p>
            <button className="mt-6 bg-white text-black px-6 py-3 font-semibold rounded-lg hover:bg-gray-200 transition  " onClick={handlego}>
              Sign up — it’s free
            </button>
            <div className="mt-8">
              <p className="text-gray-400 italic">
                “Notey is like my secret creative superpower”
              </p>
              
            </div>
          </div>

          {/* Right Section */}
          <div className="relative">
            {/* Notes UI */}
            <div className="relative flex flex-col items-center">
  {/* Notes Image */}
 
  {/* Notes UI */}
  <div className="bg-gray-900 rounded-xl p-6 shadow-lg w-full max-w-md">
    <div className="flex justify-between text-gray-400 text-sm">
      <p>Last Edited: 10:45 AM</p>
      <p>Category: Personal</p>
    </div>
    <h3 className="text-white font-semibold mt-4">Today's Tasks</h3>
    <ul className="text-gray-400 text-sm mt-2 space-y-1">
      <li>✅ Complete UI design for notes app</li>
      <li>☑️ Integrate speech-to-text functionality</li>
      <li>☑️ Test search and filter features</li>
    </ul>
    <div className="mt-4">
      <p className="text-blue-400 font-semibold">Alex</p>
      <p className="text-gray-400 text-sm">
        This notes app is coming along well! Let’s add dark mode next.
      </p>
    </div>
  </div>
</div>


            
           
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;