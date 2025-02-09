const expres = require('express');
const app = expres();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const NoteRouter = require('./Routes/NoteRouter');

require('dotenv').config();

require('./Models/db');

const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/api', NoteRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});