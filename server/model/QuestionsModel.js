import mongoose from "mongoose";

const questionsSchema = mongoose.Schema({
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

const Question = mongoose.model("question", questionsSchema)

export default Question

