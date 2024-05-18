const express = require('express');
const app = express();
const cors = require('cors')
// const connectDB = require('./config/connectDB')

// .env
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// check Backend
app.get('/', async (req, res) => {
    try {
      res.status(200).send("Backend is LIVE...")

    } catch (error) {
        res.status(500).json({ message: 'Action Failed' });
    }
});

// Routes
// const routes = require('./routes/api')
// app.use(routes);


app.listen(port, async () => {
    await connectDB()   // DB connection
    console.log(`Todo app BACKEND listening on port ${port}`)
});

