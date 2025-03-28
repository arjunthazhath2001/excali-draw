import { Request,Response,NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { SECRET } from './config';

interface MyRequest extends Request {
    userId: string; 
  }

interface Token{
    userId: string,
    iat: number 
  }


export function Middleware(req:MyRequest,res:Response,next:NextFunction){
    const token= req.headers["authorization"] ?? "" ; 
    
    try{
    const decodedToken = jwt.verify(token,SECRET) as Token

    if(decodedToken){
         req.userId = decodedToken.userId;
         next()
    } else{
        res.json({message:"Please signin again"})
    }

    } catch(error){
        res.json({message:"Authentication failed"})
    }

}