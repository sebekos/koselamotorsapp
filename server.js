const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => res.send('Api Running'));

// Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/text', require('./routes/api/text'));
app.use('/api/upload', require('./routes/api/upload'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));