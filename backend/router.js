const express = require("express")
const router = express.Router()
const adminUserSchema = require("./admin-user-schema")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")


// Home Page
router.get('/',(req,res) => {
    res.status(400).json("Invalid API")
})


// Create
router.post('/create-admin',async(req,res) => {
    try{
        var emailExist = await adminUserSchema.findOne({
            Email: req.body.Email,
        })
        if(emailExist){
            return res.status(400).json("Email already exists.")
        }
        var hashPassword = await bcrypt.hash(req.body.Password,10)

        var data = new adminUserSchema({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Mobile: req.body.Mobile,
            Password: hashPassword,
            Accept: req.body.Accept
        })
    }catch(err){
        res.status(400).json(err)
    }

    await data.save()
    res.json("Successfully Created.")
})


// Update
router.put("/update-admin",async(req,res) => {
    var hashPassword = await bcrypt.hash(req.body.Password,10)
    var updateData = await adminUserSchema.update({_id:req.body._id},{$set:{
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Mobile: req.body.Mobile,
        Password: hashPassword,
        Accept: req.body.Accept
    }})

    res.json("Successfully Updated.")
})


// Login Admin
router.post("/login-admin", async(req,res) => {
    try{
        var userData = await adminUserSchema.findOne({ Email: req.body.Email})
        if(!userData){
            return res.status(400).json("Email doesn't exists.")
        }

        var validPassword = await bcrypt.compare(req.body.Password,userData.Password)
        if(!validPassword){
            return res.status(400).json("Invalid Password.")
        }

        var userToken = jwt.sign({Email: req.body.Email},"adminUserSecretKey")
        res.header('auth', userToken).json(userToken)
        
    }catch(err){
        res.status(400).json(err)
    }
})

// User Validation
const validUser = (req,res,next) => {
    var token = req.header('auth')
    req.token = token
    next()
}


// Get All Records
router.get("/get-admin",validUser,async(req,res) =>{
    jwt.verify(req.token, "adminUserSecretKey",async(err,data) => {
        if(err){
            res.sendStatus(403).json("Invalid User")
        }else{
            var userData = await adminUserSchema.find().select(["-Password"])

            res.json(userData)
        }
    })
})


// Delete
router.delete("/delete-admin/:_id",async(req,res) => {
    var deleteData = await adminUserSchema.findByIdAndRemove(req.params._id).then(e => {
        res.json({message: "Successfully Deleted."})
    })
})

module.exports = router