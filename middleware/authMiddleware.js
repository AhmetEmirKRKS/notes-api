import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: "Yetkisiz: token yok"})
    }

    const token = authHeader.split(' ')[1]

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = {id: decoded.id} //controller da req.user.id ile kullanıcya erişeceğiz
        next()
    } catch(err){
        return res.status(401).json({message: "Token geçersiz"})
    }

}

export default verifyToken