import Bookmark from "../model/BookmarkModel.js"


export const addToBookmark = async(req, res) => {
    try {
        const {verseId, verseText, suraNumber, pageNumber} = req.body
        const userId = req.userId
        const bookmark = new Bookmark({
            user: userId, 
            verseId, 
            verseText, 
            suraNumber, 
            pageNumber
        })
        await bookmark.save()
        return res.status(201).json({message: "added to bookmarks"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
   
}

export const removefromBookmark = async(req, res) => {
    try {
        const {verseId} = req.body
        await Bookmark.findOneAndDelete({verseId})
        return res.status(200).json({message: "removed from bookmarks"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export const getUserBookmarks = async(req, res) => {
    try {
        const userId = req.userId
        const bookmarks = await Bookmark.find({user: userId})
        if(bookmarks.length === 0){
            return res.status(204).json({message: "No bookmarks yet."})
        }
        return res.status(200).json(bookmarks)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
}