import express from "express"
import { createUser } from "../controller/UserController.js"


const router  = express.Router()

router.post("/signup", createUser)
router.post("/login")
router.post("/logout")
router.get("/auth")


export default router