import User from "../model/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const createUser = async(req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body
        const existingUser = await User.findOne({email: email})
        if(existingUser){
            return res.status(400).json({message: "User already exists"})
        }
        //gen salt and hash passwword
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashedPassword = await bcrypt.hash(password, salt)

        //create new user and save
        const newUser = new User({email, firstName, lastName, password: hashedPassword})
        await newUser.save()

        return res.status(201).json({message: "user created successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(400).json({message: "User not found"})
        }

        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return res.status(400).json({message: "Invalid Email or password"})
        }

        //create token for user
        const token = jwt.sign({userId: user._id, firstName: user.firstName, lastName: user.lastName}, process.env.JWT_SECRET, {expiresIn: '2d'} )

        res.cookie('token', token, {
            httpOnly: true
        })
        return res.status(200).json({message: "logged in successfully", token: token, firstName: user.firstName})
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const verifyUser = async(req, res, next) => {
    if(!req.cookies || !req.cookies.token){
        return res.status(401).json({message: "Access denied. Cannot verify user"})
    }
    try{
        const {token} = req.cookies
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = verifiedUser.userId
        req.firstName = verifiedUser.firstName
        req.lastName = verifiedUser.lastName
        next()
    }
    catch (error) {
        console.log(error)
        return res.status(401).json({message: "Unauthorized"})
    }
}

export const logoutUser = async(req, res) => {
    try {
        res.clearCookie('token')
        return res.status(200).json({message: "logged out successfully"})
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}