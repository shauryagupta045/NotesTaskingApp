# Notes Tasking App

A powerful and intuitive Notes Tasking App built using the MERN stack (MongoDB, Express.js, React.js with Vite, and Node.js). This app allows users to create, manage, and organize notes efficiently. It supports text and audio input with speech-to-text functionality, image uploads, note editing, searching, favoriting, and full-screen mode.

## Features

- 📝 *Create and Manage Notes:* Add, edit, and delete notes effortlessly.
- 🎤 *Speech-to-Text:* Transcribe audio into text using the Browser Web Speech API.
- ⭐ *Favorites:* Mark important notes as favorites for quick access.
- 🔍 *Search Functionality:* Easily search notes by title or content.
- ☁ *Data Persistence:* All notes are saved on the server using MongoDB.

## Tech Stack

- *Frontend:* React.js with Vite
- *Backend:* Node.js, Express.js
- *Database:* MongoDB
- *Other Technologies:* Browser Web Speech API

## Installation

1. Clone the repository:

    bash
    git clone https://github.com/shauryagupta045/NotesTaskingApp.git
    cd notes-tasking-app
    

2. Install dependencies for the client:

    bash
    npm install
    

3. Install dependencies for the server:

    bash
   npm i express jsonwebtoken bcryptjs  body-parser dotenv mongoose joi cors
    

4. Create a .env file in the server folder and add the following:

    env
    MONGO_URI=your_mongodb_connection_string
    PORT=8000
    

## Running the App

1. Start the backend server:

    bash
    cd server
    node index.js
    

2. Start the frontend:

    bash
    cd ../client
    npm run dev
    

3. Open your browser and go to:

    arduino
    http://localhost:5173
    

## Folder Structure

```php
notes-tasking-app/
├── client/               # Frontend (React.js with Vite)
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Pages and views
│   │   ├── assets/       # Images and other assets
│   │   └── App.jsx
│   └── public/
│       └── index.html
└── server/               # Backend (Node.js and Express)
    ├── config/           # Database configuration
    ├── models/           # Mongoose models
    ├── routes/           # API routes
    └── index.js         # Main server file
