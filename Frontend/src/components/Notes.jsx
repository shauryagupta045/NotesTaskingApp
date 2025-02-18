import React, { useState, useEffect, useRef } from "react";
import './Notes.css';
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
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [recording, setRecording] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editText, setEditText] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const recognitionRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInuser"));
    fetchNotes();
  }, []);

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

  const toggleFavorite = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === id ? { ...note, favorite: !note.favorite } : note
      )
    );
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://notestaskingapp.onrender.com/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://notestaskingapp.onrender.com/api/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setNotes(result.notes);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addNote = async () => {
    if (input.trim() !== "" && title.trim() !== "") {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://notestaskingapp.onrender.com/api/notes`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, text: input }),
        });
        const result = await response.json();
        if (result.success) {
          setNotes([...notes, result.note]);
          setInput("");
          setTitle("");
        }
      } catch (err) {
        console.error(err);
      }
    }
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
    setEditTitle(note.title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
    setEditText("");
    setEditTitle("");
  };

  const handleEditNote = () => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === selectedNote._id ? { ...note, title: editTitle, text: editText } : note
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
            note._id === selectedNote._id ? { ...note, image: reader.result } : note
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
    <div className="notes-hero flex h-screen text-white">
      {/* Sidebar */}
      <div
        className={`notes-sidebar fixed md:static top-0 left-0 h-full w-64 p-5 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 z-50`}
      >
        <div className="flex justify-between items-center">
          <h1 className="notezy font-bold">Notezy</h1>
          <button
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>
        <ul className="mt-6">
          <li className={`p-3 rounded mb-2 flex items-center cursor-pointer ${activeTab === "home" ? "bg-purple-600" : "#181515"}`} onClick={() => setActiveTab("home")}>
            <FaHome className="mr-2" /> Home
          </li>
          <li className={`p-3 rounded flex items-center cursor-pointer ${activeTab === "favorites" ? "bg-purple-600" : "#181515"}`} onClick={() => setActiveTab("favorites")}>
            <FaStar className="mr-2" /> Favorites
          </li>
        </ul>
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <FaUser className="mr-2" />
          {loggedInUser}
          <button
            className="hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" style={{ backgroundColor: "#302f2f" }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col relative">
        <button
          className="md:hidden absolute top-4 left-4 text-white z-10"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars size={20} />
        </button>

        {/* Search Bar */}
        <div className="relative w-full md:w-2/2 mt-12 md:mt-0 mb-6 text-white">
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full p-3 shadow rounded-lg text-white text-lg pl-10" style={{ backgroundColor: "#181515" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute top-5 left-4 text-gray-400" />
        </div>

        {/* Notes List */}
        <div className="notes-list grid grid-cols-1 md:grid-cols-2 gap-5 overflow-auto">
          {notes
            .filter((note) =>
              activeTab === "favorites"
                ? note.favorite && note.text.toLowerCase().includes(search.toLowerCase())
                : note.text.toLowerCase().includes(search.toLowerCase())
            )
            .map((note) => (
              <div
                key={note._id}
                className="p-4 shadow-md rounded-lg relative break-words" style={{ backgroundColor: "#302f2f" }}
              >
                <h2 className="font-bold text-lg mb-2">{note.title}</h2>
                <p className="text-sm">{note.text}</p>
                {note.image && (
                  <img src={note.image} alt="note" className="mt-2 rounded-lg" />
                )}
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <button onClick={() => copyToClipboard(note.text)}>
                    <FaCopy className="text-gray-400 hover:text-white" />
                  </button>
                  <button onClick={() => openModal(note)}>
                    <FaEdit className="text-gray-400 hover:text-white" />
                  </button>
                  <button onClick={() => toggleFavorite(note._id)}>
                    <FaStar
                      className={`${
                        note.favorite ? "text-yellow-400" : "text-gray-400"
                      } hover:text-yellow-400`}
                    />
                  </button>
                  <button onClick={() => deleteNote(note._id)}>
                    <FaTrash className="text-red-500 hover:text-red-600" />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Input Box */}
        <div
          className="fixed bottom-4 left-4 right-4 md:left-68 md:right-6 p-3 shadow-lg rounded-lg flex flex-col space-y-3"
          style={{ backgroundColor: "#181515" }}
        >
          <input
            type="text"
            className="w-full p-3 text-bold rounded-lg"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full p-3 text-bold rounded-lg pl-10"
              placeholder="Write a note..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <FaMicrophone
              className={`absolute top-4 left-3 ${
                recording ? "text-red-500" : "text-white"
              } cursor-pointer`}
              onClick={startRecording}
            />
          </div>
          <button
            onClick={addNote}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            Save Note
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && selectedNote && (
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
              isFullscreen ? "p-0" : "p-4"
            }`}
          >
            <div
              className={`rounded-lg shadow-lg ${
                isFullscreen ? "w-full h-full" : "w-11/12 md:w-1/2"
              }`}
              style={{ backgroundColor: "#181515" }}
            >
              <div className="p-4">
                <input
                  type="text"
                  className="w-full p-3 text-white rounded-lg mb-4" style={{ backgroundColor: "#302f2f" }}
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Title..."
                />
                <textarea
                  className="w-full p-3 text-white rounded-lg mb-4" style={{ backgroundColor: "#302f2f" }}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                {selectedNote.image && (
                  <img
                    src={selectedNote.image}
                    alt="note"
                    className="mt-2 rounded-lg"
                  />
                )}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={handleEditNote}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                  <button
                    onClick={closeModal}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Close
                  </button>
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