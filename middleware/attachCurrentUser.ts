import UserModel from '../model/user'
import  {Request , Response, NextFunction } from "express"

export default async (req:Request, res:Response, next:NextFunction ) => {
  try {
  
    const decodedUser = req.body.token;
     const user = await UserModel.findOne({ _id: decodedUser._id });
    if (!user) {
      res.status(401).end();
    }
    req.body.currentUser = user;
    return next();
  } catch(e) {
    return res.json(e).status(500);
  }
}