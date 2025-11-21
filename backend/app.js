const express = require('express');
const app = express();
const indexRoute = require('./routes/index');
const cors = require('cors')
require('dotenv').config();

const PORT = process.env.PORT || 8080;

// increase payload limits to accept base64 image data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// enable CORS for deployed frontend and local dev
const allowedOrigins = [
  'https://manthan-hmmarmi6a-sidrajagrawals-projects.vercel.app',
  'https://manthanbackend-j3g6vcsvk-sidrajagrawals-projects.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));



// API Base Route
app.get('/',(req,res)=>{
    res.send("<h1>Welcome</h1>")
})

app.use('/api', indexRoute);

app.listen(PORT, () => { console.log(`Server Running at ${PORT}`) });