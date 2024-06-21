import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import UserRoutes from "./routes/UserRoutes.js"
import Question from "./model/QuestionsModel.js"

dotenv.config()
const HADITH_URL = 'https://hadithapi.com/api/hadiths/?apiKey='
const CHAPTERS_URL = 'https://hadithapi.com/api/sahih-bukhari/chapters?apiKey='
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

//routes
app.use("/api/users", UserRoutes)
// get already made questions
app.get("/api/questions", async(req, res) => {
    try {
        const questions = await Question.find()
        res.json(questions)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
})
import axios from 'axios';
// get hadith Chapters
app.get("/api/hadith", async(req, res) => {
    try {
        const chapters = await axios.get(`${CHAPTERS_URL}${process.env.API_KEY}`)
        res.json(chapters.data)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal Server Error"})
    }
})
// get hadith Sahih Bukhari
app.get("/api/hadith/:chapterNum", async(req, res) => {
    try {
        const { chapterNum } = req.params
        const hadiths = `${HADITH_URL}${process.env.API_KEY}&book=sahih-bukhari&chapter=${chapterNum}`

        const response = await axios.get(hadiths)
        res.json(response.data)
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal server error"})
    }
})

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("database connected")
    //listen to port
    app.listen(process.env.PORT, () => {
        console.log(`Listening to port on : ${process.env.PORT}`)
    })
}).catch(err => console.log("error: ", err))