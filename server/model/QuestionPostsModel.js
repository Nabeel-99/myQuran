import mongoose from "mongoose";
import mongoose from "mongoose";

const questionPostsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    question: {
        type: String,
        required: true
    },
    options: {
        type: Object,
        required: true
    },
    correct_answer: {
        type: String,
        required: true
    }
})

const QuestionPost = mongoose.model("question_post", questionPostsSchema)

export default QuestionPost

