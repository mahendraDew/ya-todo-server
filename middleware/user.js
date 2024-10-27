const jwt = require("jsonwebtoken")
const { UserModel } = require("../database");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    try {
        const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
        if(!token){
            return res.status(401).json({
                msg: 'No token provided, authorization denied'
            })
        }

        const decoded  = jwt.verify(token, process.env.USER_JWT_SECRET);

        const user = await UserModel.findById(decoded.id);
        if(!user){
            return res.status(404).json({
                msg: "User not found"
            })
        }

        req.user = user;
        next();


    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg:"Token is not valid"
        })
    }
    
}


async function adminMiddleware(req, res, next) {
    // Check if the user is authenticated
//   if (!req.user) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

    try {
        const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
        if(!token){
            return res.status(401).json({
                msg: 'No token provided, authorization denied'
            })
        }

        const decoded  = jwt.verify(token, process.env.USER_JWT_SECRET);

        const user = await UserModel.findById(decoded.id);
        if(!user){
            return res.status(404).json({
                msg: "User not found"
            })
        }

        next();


    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg:"Token is not valid"
        })
    }

}


module.exports = {
    userMiddleware: userMiddleware,
    adminMiddleware: adminMiddleware
};