import express from 'express';
import cors from 'cors';

// app initialise
const app = express();
app.use(cors());
app.use(express.json({ extended: false }));

// app routes


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Node server on ${PORT}`));