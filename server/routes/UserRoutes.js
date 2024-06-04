import express from "express"
import { createUser, loginUser, logoutUser, verifyUser } from "../controller/UserController.js"


const router  = express.Router()

router.post("/signup", createUser)
router.post("/login", loginUser)
router.post("/logout", logoutUser)
router.get("/auth", verifyUser, async(req, res) => {
    res.json({
        message: "Authenticated", 
        userId: req.userId, 
        fullName: `${req.firstName} ${req.lastName}`,
        email: req.email
    })
})

export default router