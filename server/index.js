import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import UserRoutes from "./routes/UserRoutes.js"

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

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("database connected")
    //listen to port
    app.listen(process.env.PORT, () => {
        console.log(`Listening to port on : ${process.env.PORT}`)
    })
}).catch(err => console.log("error: ", err))