import  jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";

export const verifyToken = async (req, res) => {

    const token = req.headers['x-access-token'];

    if(!token) return res.status(403).json('No token Provided')

    const decoded = jwt.verify(token, config.SECRET)
    
    const user = await User.findById(decoded.id, {password: 0})
    if(!user)return res.status(403).json('No user found')
}