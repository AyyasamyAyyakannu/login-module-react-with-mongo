// Third Party Module
const express = require("express")
const app = express();
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")


// Middleware
app.use(morgan("dev"))
// Body Parser
app.use(express.json())
// CORS Issue
app.use(cors())


// API Router
const router = require('./router')
app.use('/api', router)


// Listen Port
app.listen(5555,() => {
    console.log("Server started on 5555")
})


// Connect Mangoose
mongoose.connect("mongodb+srv://ayyasamy:ayyasamy@123@learn-react-with-mango.hwyqc.mongodb.net/app-admin?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true },
(err) => {
    if(!err){
        console.log("DB Successfully Connected")
    }
})