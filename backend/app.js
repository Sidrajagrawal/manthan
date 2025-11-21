const express = require('express');
const app = express();
const indexRoute = require('./routes/index');
const cors = require('cors')
require('dotenv').config();

const PORT = process.env.PORT || 8080;

// increase payload limits to accept base64 image data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(cors({
  origin: ['https://manthan-cpnytgv11-sidrajagrawals-projects.vercel.app/' ], // Add your deployed frontend domain
  credentials: true
}));

// API Base Route
app.use('/api', indexRoute);

app.listen(PORT, () => { console.log(`Server Running at ${PORT}`) });