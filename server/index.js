import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import UserRoutes from "./routes/UserRoutes.js"
import Question from "./model/QuestionsModel.js"

dotenv.config()

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

//routes
app.use("/api/users", UserRoutes)
// get questions
app.get("/api/questions", async(req, res) => {
    try {
        const questions = await Question.find()
        res.json(questions)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
})

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("database connected")
    //listen to port
    app.listen(process.env.PORT, () => {
        console.log(`Listening to port on : ${process.env.PORT}`)
    })
}).catch(err => console.log("error: ", err))