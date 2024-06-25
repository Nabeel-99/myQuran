import User from "../model/UserModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import QuestionPost from "../model/QuestionPostsModel.js"
import Bookmark from "../model/BookmarkModel.js"
import Note from "../model/NotesModel.js"

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
        const token = jwt.sign({userId: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName}, process.env.JWT_SECRET, {expiresIn: '2d'} )

        res.cookie('token', token, {
            httpOnly: true
        })
        return res.status(200).json({message: "logged in successfully", token: token, firstName: user.firstName})
    } catch (error) {
        console.error(error)
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
        req.email = verifiedUser.email
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

export const deleteAccount = async(req, res) => {
    try {
        const userId = req.userId
        const deleteUser = await User.findByIdAndDelete(userId)
        if (deleteUser) {
            res.clearCookie("token"); // Clear the JWT token cookie upon successful deletion
            // Delete associated data
            await QuestionPost.deleteMany({ user: userId });
            await Bookmark.deleteMany({ user: userId });
            await Note.deleteMany({ user: userId });
            return res.status(200).json({ message: "User deleted successfully" });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error)
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}