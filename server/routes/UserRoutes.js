import express from "express"
import { createUser, loginUser, logoutUser, verifyUser } from "../controller/UserController.js"
import { addToBookmark, getUserBookmarks, removefromBookmark } from "../controller/BookmarkController.js"
import { deleteNote, getUserNotes, postNote, updateNote } from "../controller/NotesController.js"


const router  = express.Router()
// user
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

// bookmarks
router.get("/bookmarks", verifyUser, getUserBookmarks)
router.post("/add", verifyUser, addToBookmark)
router.delete("/delete", verifyUser, removefromBookmark)

// notes
router.get("/notes", verifyUser, getUserNotes)
router.post('/add-notes', verifyUser, postNote)
router.delete('/delete-notes/:id', verifyUser, deleteNote)
router.put('/update-notes/:id', verifyUser, updateNote)
export default router