import React, { useState, useEffect, useRef } from "react";
import {
  FaMicrophone,
  FaImage,
  FaSearch,
  FaStar,
  FaTrash,
  FaHome,
  FaFilter,
  FaUser,
  FaBars,
  FaTimes,
  FaCopy,
  FaEdit,
  FaExpand,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [recording, setRecording] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editText, setEditText] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const recognitionRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInuser'));
  }, []);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        setInput(event.results[0][0].transcript);
        setRecording(false);
      };
    }
  }, []);

  const startRecording = () => {
    if (recognitionRef.current) {
      setRecording(true);
      recognitionRef.current.start();
    }
  };

  const addNote = () => {
    if (input.trim() !== "") {
      setNotes([...notes, { id: Date.now(), text: input, favorite: false, image: null }]);
      setInput("");
    }
  };

  const toggleFavorite = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, favorite: !note.favorite } : note
      )
    );
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInuser");
    alert("Logout Successfully ");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const openModal = (note) => {
    setSelectedNote(note);
    setEditText(note.text);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
    setEditText("");
  };

  const handleEditNote = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === selectedNote.id ? { ...note, text: editText } : note
      )
    );
    closeModal();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === selectedNote.id ? { ...note, image: reader.result } : note
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-800 p-5 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 z-50`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Notezy</h1>
          <button className="md:hidden text-white" onClick={() => setSidebarOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>
        <ul className="mt-6">
          <li className={`p-3 rounded mb-2 flex items-center cursor-pointer ${activeTab === "home" ? "bg-purple-600" : "bg-gray-700"}`} onClick={() => setActiveTab("home")}>
            <FaHome className="mr-2" /> Home
          </li>
          <li className={`p-3 rounded flex items-center cursor-pointer ${activeTab === "favorites" ? "bg-purple-600" : "bg-gray-700"}`} onClick={() => setActiveTab("favorites")}>
            <FaStar className="mr-2" /> Favorites
          </li>
        </ul>
        <div className="absolute bottom-4 left-4 flex items-center">
          <FaUser className="mr-2" />{loggedInUser}
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col relative">
        <button className="md:hidden absolute top-4 left-4 text-white z-10" onClick={() => setSidebarOpen(true)}>
          <FaBars size={20} />
        </button>

        {/* Search Bar */}
        <div className="relative w-full md:w-1/2 mt-12 md:mt-0 mb-6">
          <input type="text" placeholder="Search notes..." className="w-full p-3 bg-gray-700 shadow rounded-lg text-white text-lg pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
        </div>

        {/* Notes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-auto">
          {notes.filter((note) => (activeTab === "favorites" ? note.favorite && note.text.toLowerCase().includes(search.toLowerCase()) : note.text.toLowerCase().includes(search.toLowerCase()))).map((note) => (
            <div key={note.id} className="bg-gray-800 p-4 shadow-md rounded-lg relative">
              <p className="font-bold">{note.text}</p>
              {note.image && <img src={note.image} alt="note" className="mt-2 rounded-lg" />}
              <div className="absolute bottom-2 right-2 flex gap-2">
                <button onClick={() => copyToClipboard(note.text)}>
                  <FaCopy className="text-gray-400" />
                </button>
                <button onClick={() => openModal(note)}>
                  <FaEdit className="text-gray-400" />
                </button>
                <button onClick={() => toggleFavorite(note.id)}>
                  <FaStar className={note.favorite ? "text-yellow-400" : "text-gray-400"} />
                </button>
                <button onClick={() => deleteNote(note.id)}>
                  <FaTrash className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="fixed bottom-4 left-4 right-4 md:left-68 md:right-6 bg-gray-800 p-3 shadow-lg rounded-lg flex items-center space-x-3">
          <div className="relative flex-1">
            <input type="text" className="w-full p-3 bg-gray-700 text-white rounded-lg pl-10" placeholder="Write a note..." value={input} onChange={(e) => setInput(e.target.value)} />
            <FaMicrophone className={`absolute top-3 left-3 ${recording ? "text-red-500" : "text-gray-400"}`} onClick={startRecording} />
          </div>
          
          <button onClick={addNote} className="bg-purple-600 text-white px-4 py-2 rounded-lg">Save</button>
        </div>

        {/* Modal */}
        {isModalOpen && selectedNote && (
          <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${isFullscreen ? "p-0" : "p-4"}`}>
            <div className={`bg-gray-800 rounded-lg shadow-lg ${isFullscreen ? "w-full h-full" : "w-11/12 md:w-1/2"}`}>
              <div className="p-4">
                <textarea
                  className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                {selectedNote.image && <img src={selectedNote.image} alt="note" className="mt-2 rounded-lg" />}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <button onClick={handleEditNote} className="bg-purple-600 text-white px-4 py-2 rounded-lg">Save</button>
                    <button onClick={toggleFullscreen} className="bg-gray-700 text-white px-4 py-2 rounded-lg">
                      <FaExpand />
                    </button>
                    <button onClick={() => toggleFavorite(selectedNote.id)} className="bg-gray-700 text-white px-4 py-2 rounded-lg">
                      <FaStar className={selectedNote.favorite ? "text-yellow-400" : "text-gray-400"} />
                    </button>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                    <label htmlFor="image-upload" className="bg-gray-700 text-white px-4 py-2 rounded-lg cursor-pointer">
                      <FaImage />
                    </label>
                  </div>
                  <button onClick={closeModal} className="bg-red-600 text-white px-4 py-2 rounded-lg">Close</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;