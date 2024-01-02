
const User = require('../models/userModel')

exports.findUsers = async (req,res) => {
    try {
        const users = await User.find()
        if(!users){
            return res.json(400).json({ error: error.message })
        }
        res.status(200).json({ users })
            
    } catch (error) {
        res.json(400).json({ error: error.message })
    }
}
exports.findUser=async(req,res)=>{
    const { id } = req.params
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.json(400).json({ error: error.message })
        }
        res.status(200).json({ user })

    } catch (error) {
        res.json(400).json({ error: error.message })
    }
}
exports.adduser = async (req,res)=>{
    try {
        const { name, UserName, email, mobile } = req.body;
        const user = await User.create({ name, UserName, email, mobile })
        if(!user){
            return res.staus(400).json({ error: error.message })  
        }
        res.status(201).json({ user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
exports.deleteUser=async(req,res)=>{
    const { id } = req.params
    const user=await User.findByIdAndDelete(id)
    if (!user){
        return res.status(404).json({error:"No Such User"})
    }
    res.status(204)
}
exports.editUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findByIdAndUpdate(id, { ...req.body }, { new: true })
    if (!user) {
        return res.status(404).json({ error: "No Such User" })
    }
    res.status(200).json({ user })
}