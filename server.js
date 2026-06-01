require("dotenv").config();
const express = require('express');
const connectDB = require('./config/db.js');
const noteRoutes = require('./routes/noteRoutes.js');
const app = express();

app.use(express.json());
app.use('/api/notes', noteRoutes);

connectDB();

app.get('/', (req,res) =>{
    res.send("Server is running...")
})

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})