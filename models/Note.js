import mongoose from "mongoose"

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', //hangi modele bağlı?
        required: true
    },
},{timestamps: true})

const Note = mongoose.model("Note",noteSchema,'notes')

export default Note