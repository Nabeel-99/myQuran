import User from "../model/UserModel.js"
import bcrypt from "bcryptjs"


export const createUser = async(req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await User.findOne({email: email})
        if(existingUser){
            return res.status(400).json({message: "User already exists"})
        }
        //gen salt and hash passwword
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashedPassword = await bcrypt.hash(password, salt)

        //create new user and save
        const newUser = new User({email, password: hashedPassword})
        await newUser.save()

        return res.status(201).json({message: "user created successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
}