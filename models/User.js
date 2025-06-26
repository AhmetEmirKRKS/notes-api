import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 2
    }
},{timestamps: true})

//kaydedilmeden önce şifreyi hash'le (mongoose hook)
userSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next()

        try{
            const salt = await bcrypt.genSalt(10)
            this.password = await bcrypt.hash(this.password, salt)
            next()
        } catch(error){
            next(err)
        }
})

//Şifre karşılasştırma metodu
userSchema.methods.comparePassword = async function (inputPassword){ //userSchema.methods mongoose'un instance method tanımlama şeklidir yani bu metod her bir kullanıcı nesnesi için çalışabilir
    return await bcrypt.compare(inputPassword,this.password)
}

const User = mongoose.model('User',userSchema,'users')

export default User