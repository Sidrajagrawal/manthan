const express = require('express');
const app = express();
const indexRoute = require('./routes/index');
const cors = require('cors')
require('dotenv').config();

const PORT = process.env.PORT || 8080;

// increase payload limits to accept base64 image data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// enable CORS (call the factory to get middleware)
// app.use(cors());

app.use(cors({
  origin: ['https://manthan-cpnytgv11-sidrajagrawals-projects.vercel.app/' ],
  credentials: true
}));

// API Base Route
app.get('/',(req,res)=>{
    res.send("<h1>Welcome</h1>")
})

app.use('/api', indexRoute);

app.listen(PORT, () => { console.log(`Server Running at ${PORT}`) });