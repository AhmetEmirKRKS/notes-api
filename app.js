import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import noteRoutes from './routes/noteRoutes.js'
import userRoutes from './routes/authRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

dotenv.config() //ortam değişkenlerini yükler

const app = express()
const port = process.env.PORT


app.use(express.json())
connectDB()

app.use('/api/notes',authMiddleware,noteRoutes)
app.use('/api/users',userRoutes)

app.get('/', (req,res) => {
    res.send("Notes api çalışıyor")
    console.log("note api çalışıyor")
})

app.listen(port , () => {
    console.log(`Server ${port} numaralı portta çalışıyor`)
})