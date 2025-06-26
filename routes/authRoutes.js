import express from 'express'
import {registerUser,loginUser} from '../controller/authController.js'
import {body,validationResult} from 'express-validator'

const router = express.Router()

router.post(
    '/register',
    [
        body('name').notEmpty().withMessage('İsim zorunludur'),
        body('email').notEmpty().withMessage('Geçerli email girin'),
        body('password').isLength({min: 6}).withMessage('Şifre en az 6 karakterli olmalı')
    ],
    (req,res,next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next()
    },
    registerUser
)


router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Geçerli bir email girin'),
        body('password').notEmpty().withMessage('Şİfre boş olamaz')
    ],
    (req,res,next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        next()
    },
    loginUser
)

export default router