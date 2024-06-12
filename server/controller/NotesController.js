import Note from "../model/NotesModel.js"


export const getUserNotes = async(req, res) => {
    try {
        const userId = req.userId
        const notes = await Note.find({user: userId})
        if(notes.length === 0){
            return res.status(204).json({message: "No notes yet"})
        }
        return res.status(200).json(notes)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal Server Error"})
    }
}
export const postNote = async(req, res) => {
    try {
        const userId = req.userId
        const {verseText, suraNumber, verseId, note, verseTranslation} = req.body
        const userNotes = new Note({
            user: userId,
            verseText,
            suraNumber,
            verseId,
            note,
            verseTranslation
        })
        await userNotes.save()
        return res.status(201).json({message : "Added to notes"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal server error"})
    }
}

export const deleteNote = async(req, res) => {
    try {
        const {id} = req.params
        // const userId = req.userId
        await Note.findOneAndDelete({ _id: id })
        return res.status(200).json({message: "removed from favorites"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({messsage: "Internal server error"})
    }
}

export const updateNote = async(req, res) => {
    try {
        const {id} = req.params
        const {note} = req.body
        const updatedData = await Note.findByIdAndUpdate(id, {note}, {new: true})
        return res.status(200).json(updatedData)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
}