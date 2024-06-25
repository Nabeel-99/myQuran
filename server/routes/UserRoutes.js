import express from "express"
import { createUser, deleteAccount, loginUser, logoutUser, verifyUser } from "../controller/UserController.js"
import { addToBookmark, getUserBookmarks, removefromBookmark } from "../controller/BookmarkController.js"
import { deleteNote, getUserNotes, postNote, updateNote } from "../controller/NotesController.js"
import { deleteQuestion, getAllQuestionsPostedByUser, getUserQuestions, getUsersWithQuestions, postQuestion, updateQuestion } from "../controller/QuestionsController.js"


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
router.delete("/delete-account", verifyUser, deleteAccount)

// bookmarks
router.get("/bookmarks", verifyUser, getUserBookmarks)
router.post("/add", verifyUser, addToBookmark)
router.delete("/delete", verifyUser, removefromBookmark)


// notes
router.get("/notes", verifyUser, getUserNotes)
router.post('/add-notes', verifyUser, postNote)
router.delete('/delete-notes/:id', verifyUser, deleteNote)
router.put('/update-notes/:id', verifyUser, updateNote)

// questions
router.get("/user-questions", verifyUser, getUserQuestions)
router.get("/all-questions", getUsersWithQuestions)
router.get("/questions/:id", getAllQuestionsPostedByUser)
router.post("/post-questions", verifyUser, postQuestion)
router.put("/update-questions/:id", verifyUser, updateQuestion)
router.delete("/delete-question/:id", verifyUser, deleteQuestion)
export default router