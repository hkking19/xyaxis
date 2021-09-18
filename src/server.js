const express = require('express');
const cors = require('cors');
require('dotenv');
require('./cache/redis');

// app initialise
const app = express();
app.use(cors());
app.use(express.json({ extended: false }));

// app routes
app.use('/stream', require('./routes/stream'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Node server on ${PORT}`));