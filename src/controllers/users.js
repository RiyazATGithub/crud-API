const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const user = require("../models/models.js")
// app.use(express.json())


const Register= async(req,res)=>{
    const { email, password } = req.body
    if (!email || !password)
        return res.status(401).send('user detail invalid')

    try {
        const existUser = await user.findOne({ email })
        if (existUser) {
            res.status(409).send('user already exist')
        }
        const newUser = new user({ email, password })
        await newUser.save()
        res.status(200).send('user added')
    } catch (err) {
        console.log(err);
        if (!res.headersSent)
            res.status(500).send('error')
    }
}



const Login=async(req,res)=>{
 const { email, password } = req.body
    const users = await user.findOne({ email })
    if (!users)
        return res.send('user not added')
    const isValid = await bcrypt.compare(password, users.password)
    if (!isValid)
        res.status(401).send('password invalid')
    const token = jwt.sign({ id: users._id, email: users.email }, 'secretkey')
    res.status(200).send(token)
}



const userDetails=async (req, res) => {
    const userId = req.params.id
    const users = await user.findById(userId)
    res.status(200).send((users))
    console.log(users);
    if (!user)
        return res.status(404).send('invalid id')
}



const Update= async (req, res) => {
    const { phone, address } = req.body
    const userId = req.params.id
    try {
        const userDoc = await user.findByIdAndUpdate(userId, { $set: { phone, address } }, { new: true })
        console.log(userDoc);
        if (!userDoc)
            return res.send('user not found')
        console.log(userDoc);
        res.status(200).send(userDoc)
    } catch (err) {
        console.log(err);
    }
}



const Delete= async (req, res) => {
    try {
        const userId = req.params.id
        const users = await user.findByIdAndDelete(userId)
        res.status(200).send('user Deleted')

        if (!user)
            return res.status(404).send('user not found')
    } catch (err) {
        console.log(err);
    }
}



module.exports={Register,Login,userDetails,Update,Delete}