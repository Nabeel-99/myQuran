import mongoose from "mongoose";

const bookmarkSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    pageNumber: {
        type: Number,
        required: true
    },
    suraNumber:{
        type: Number,
        required: true
    },
    verseText: {
        type: String,
        required: true
    },
    verseId: {
        type: String,
        required: true
    }

})

const Bookmark = mongoose.model("bookmark", bookmarkSchema)

export default Bookmark