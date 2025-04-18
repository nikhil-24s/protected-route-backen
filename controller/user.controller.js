const userModel = require('../models/users.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res)=>{
    try {
        const {username, email, password} = req.body

        if(!username || !email || !password) return res.json({status: false, message: 'All fields required'});

        const isUserExist = await userModel.findOne({email});

        if(isUserExist){
            return res.json({status: false, message: 'User already have account'});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            username,
            email,
            password: hashPassword
        })
        await user.save()

        res.status(200).json({status: true, message: 'Registerd successfully'});

    } catch (error) {
        res.json({status: false, message: 'Failed to register', error})
    }

}
const login = async (req, res)=>{
    try {
        const {email, password} = req.body

        if( !email || !password) return res.json({status: false, message: 'All fields required'});

        const isUserExist = await userModel.findOne({email}).select('+password');

        if(!isUserExist){
            return res.json({status: false, message: 'Email Or Password Is Incorrect'});
        }
        
        const isPassMatch = await bcrypt.compare(password, isUserExist.password);
        
        if(!isPassMatch){
            return res.json({status: false, message: 'Email Or Password Is Incorrect'});
        }

        const token = jwt.sign({id: isUserExist._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        
        res.status(200).json({status: true, message: 'Login successfully', token});

    } catch (error) {
        res.json({status: false, message: 'Failed to login', error})
    }

}

const profile = async (req, res)=>{
    res.json({ status: true, user: req.user });
}

module.exports = {
    register,
    login,
    profile
}