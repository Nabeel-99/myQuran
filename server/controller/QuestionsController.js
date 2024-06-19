import QuestionPost from "../model/QuestionPostsModel.js"
import User from "../model/UserModel.js"

//for profile
export const getUserQuestions = async(req, res) => {
    try {
        const userId = req.userId
        const questions = await QuestionPost.find({user: userId})
        if(questions.length  === 0){
            return res.status(204).json({message: "No questions yet"})
        }
        return res.status(200).json(questions)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const getUsersWithQuestions = async(req, res) => {
    try{
        const distinctUsers = await QuestionPost.distinct('user')
        if(distinctUsers.length === 0 || !distinctUsers){
            return res.status(204).json({message: "No users with questions found"})
        }
        const populatedUsers = await User.find({_id: {$in: distinctUsers}}, 'firstName lastName')
        return res.status(200).json(populatedUsers)
    }catch(error){
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const getAllQuestionsPostedByUser = async (req, res) => {
    try {
        const userId = req.params.id
        const questions = await QuestionPost.find({user: userId})
        if(!questions){
            return res.status(400).json({message: "No questions found for this user"})
        }
        return res.status(200).json(questions)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const deleteQuestion = async(req, res) => {
    try {
        const {id} = req.params
        await QuestionPost.findOneAndDelete({_id: id})
        return res.status(200).json({message: "delete successful"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
}
export const updateQuestion = async(req, res) => {
    try {
        const {id} = req.params
        const {question, options, correct_answer} = req.body
        const updatedQuestion = await QuestionPost.findByIdAndUpdate(id, {
            question, options, correct_answer
        }, {new: true})
        return res.status(201).json(updatedQuestion)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Interal Server Error"})
    }
}

export const postQuestion = async(req, res) => {
    try {
        const userId = req.userId
        const {questions} = req.body
        if(questions.length === 0){
            return res.status(400).json({message: "No questions provided"})
        }
        const questionPosts = questions.map(q => ({
            user: userId,
            question: q.question,
            options: q.options,
            correct_answer: q.correct_answer
        }))
        await QuestionPost.insertMany(questionPosts)
        return res.status(201).json({message: "Post successful"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal Server Error"})
    }
}