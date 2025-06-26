import  Note  from "../models/Note.js"

//not oluşturma
export const createNote = async (req,res) => {
    try{
        const {title,content} = req.body

        if(!title || !content){
            return res.status(400).json({message: "Başlık ve içerik zorunludur"})
        }

        const newNote = new Note({
            title,
            content,
            user: req.user.id //token'dan gelen kullanıcı id'si
        })

        await newNote.save()
        res.status(201).json({message: "not eklendi",note:newNote})
    } catch(err){
        console.error('createNote error:',err)
        res.status(500).json({message: "Sunucu hatası"})
    }
}

//not listeleme (kullanıcıya özel)
export const getNotes = async (req,res) => {
    try{
        const notes = await Note.find({user: req.user.id}).sort({createdAt: -1})
        res.status(200).json(notes)
    } catch(err){
        console.error('getNotes error:',err)
        res.status(500).json({message: "Sunucu hatası"})
    }
}


//not güncelle
export const updateNote = async (req,res) => {
    try{
        const note = await Note.findOneAndUpdate( //bu filter 3 parametre alır (filter,update,options)
            {_id: req.params.id, user:req.user.id},
            req.body,
            {new: true}
        )

        if(!note){
            return res.status(404).json({message: "Not bulunamadı veya yetkisiz"})
        }

        res.status(200).json({message: "Not güncellendi",note})
    } catch(error){
        console.error("updateNote error:",err)
        res.status(500).json({message: "Sunucu hatası"})
    }
}

//not sil
export const deleteNote = async (req,res) => {
    try{
        const deleted = await Note.findOneAndDelete({
            _id:req.params.id,
            user:req.user.id
        })

        if(!deleted){
            return res.status(404).json({message: "Not bulunamadı veya yetkisiz"})
        }

        res.status(200).json({message: "Not silindi"})
    } catch(error){
        console.error("deleted error:",error)
        res.status.json({message: "Sunucu hatası"})
    }
}


