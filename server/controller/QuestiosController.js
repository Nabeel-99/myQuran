import QuestionPost from "../model/QuestionPostsModel.js"

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

export const getAllQuestions = async(req, res) => {
    try{
        const allQuestions = await QuestionPost.find()
        if(allQuestions.length === 0){
            return res.status(204).json({message: "No Questions in database"})
        }
        return res.status(200).json(allQuestions)
    }catch(error){
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
    } catch (error) {
        
    }
}