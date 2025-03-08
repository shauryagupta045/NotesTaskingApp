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
    'https://notes-tasking-app-nine.vercel.app',
    'https://notes-tasking-app-nh1p.vercel.app'
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
    credentials: true, 
}));

app.options('*', cors()); // Handle preflight requests

app.use((req, res, next) => {
    console.log('Request Origin:', req.headers.origin);
    next();
});

app.use(bodyParser.json());
app.use('/auth', AuthRouter);
app.use('/api', NoteRouter);

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
