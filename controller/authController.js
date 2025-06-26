import User from '../models/User.js'
import jwt from 'jsonwebtoken'

//JWT Token oluşturma
const generateToken = (userId) => { //bu fonksiyon jwt üretir sign metodu token üretmek için kullanılan jwt fonksiyonudur
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '7d'})
}

//kullanıcı kaydı
export const registerUser = async (req,res) => {
    try{
        const {name,email,password} = req.body

        if(!name || !email || !password){
            return res.status(400).json({message: "Boş alanları doldurun"})
        }

        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({message: "Kullanıcı zaten kayıtlı"})
        }

        const newUser = new User({name,email,password})
        await newUser.save()

        res.status(201).json({
            message: "Kayıt başarılı",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
            token: generateToken(newUser._id) //kullanıcı kayıt olduktan sonra otomatik olarak giriş yapıyor böylelikle tekrar login yapmak zorunda kalınmıyor
        })
    } catch(err){
        console.error('registerUser error:',err)
        res.status(500).json({message: "Sunucu hatası"})
    }
}

//kullanıcı girişi
export const loginUser = async (req,res) => {
    try{
            const {email,password} = req.body

            if(!email || !password){
                return res.status(400).json({message: "Boş alanları doldurun"})
            }

            const user = await User.findOne({email})
            if(!user){
                return res.status(401).json({message: "Geçersiz kimlik bilgileri"})
            }

            const isMatch = await user.comparePassword(password)
            if(!isMatch) {
                return res.status(401).json({message: 'Hatalı şifre'})
            }

            res.status(200).json({
                message: 'Giriş başarlı',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                token: generateToken(user._id)
            })
       }catch(err){
            console.error('loginUser error:',err)
            return res.status(500).json({message: "Sunucu hatası"})
        }
}