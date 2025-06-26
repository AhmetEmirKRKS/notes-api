import express from 'express'
import {
    createNote,
    getNotes,
    updateNote,
    deleteNote
} from '../controller/noteController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import {body,validationResult} from 'express-validator'

const router = express.Router()

router.get('/',authMiddleware,getNotes)
router.post(
    '/',
    authMiddleware,
    [
        body('title').notEmpty().withMessage('Başlık zorunludur'),
        body('content').notEmpty().withMessage('İçerik zorunludur')
    ],
    (req,res,next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next()
    },
    createNote
)

router.put('/:id',authMiddleware,updateNote)
router.delete('/:id',authMiddleware,deleteNote)

export default router