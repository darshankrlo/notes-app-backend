const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req,res) => {
    try {
        const {username, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).send({message: "Email already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        res.status(201).send({
            message: "User registered successfully"
        });
    } catch (error) {
        res.status(500).send({message: "Error registering user"});
    }
}

const login = async (req,res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).send(
                {message: "Invalid email or password"}
            )
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).send(
                {message: "Invalid email or password"}
            )
        }
        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );
        res.status(200).send({message: "Login successful", token});
    
    }catch(error){
        res.status(500).send({message: "Error logging in user"});
    }
}

exports.register = register;
exports.login = login;