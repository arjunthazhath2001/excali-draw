import express from 'express';
import jwt from 'jsonwebtoken'
import z from 'zod'
import { SECRET } from './config';
import bcrypt from 'bcrypt';

const app = express()
app.use(express.json())


app.post('/signup',async (req,res)=>{
    const requiredBody= z.object({
        username: z.string().min(5,{message:"Username should be minimum 5 characters"}).max(20,{message:"Username should be maximum 20 characters"}),
        password: z.string().min(5,{message:"Password should be minimum 5 characters"}).max(20,{message:"Password should be maximum 20 characters"}),
    })

    const parsedBody= requiredBody.safeParse(req.body);
    if(!parsedBody.success){
        res.json({"message": parsedBody.error.issues[0]?.message})
        return
    }

    const username= req.body.username;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password,5)
    
    //DB CALL

    res.json({userId:123})

    
})

app.post('/signin', async (req,res)=>{
    const username= req.body.username;
    const password = req.body.password;
    //DB CALL   
    
    const verified= await bcrypt.compare(password,user.password)
    if(verified){
        const userId=user.userId;
        const token= jwt.sign({userId},SECRET)
        res.json({"token": token})    
    } else{
        res.json({message:"password mismatch"})
        return
    }

})

app.post('/createroom',(req,Middleware,res)=>{
   
    
})


app.listen(3001)
