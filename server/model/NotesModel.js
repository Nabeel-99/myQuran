import mongoose from "mongoose"

const NotesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    note: {
        type: String,
        required: true
    },
    verseText: {
        type: String,
        required: true
    },
    suraNumber: {
        type: Number,
        required: true
    },
    verseId: {
        type: String,
        required: true
    },
    verseTranslation: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Note = mongoose.model("note", NotesSchema)

export default Note


