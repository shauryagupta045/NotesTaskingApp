const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const NoteRouter = require('./Routes/NoteRouter');
require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

// CORS Configuration
const allowedOrigins = [
    'https://notestaskingapp-aqrp.onrender.com', // Replace this with your frontend's deployed URL
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());
app.use('/auth', AuthRouter);
app.use('/api', NoteRouter);

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
