import { NextFunction,Request,Response } from "express";


interface IOptions{
    requestDelayTimeout:number
}

const  ReqLogger= (options:IOptions)=>{
    return async function(req:Request,res:Response,next:NextFunction){
        console.log(`${req.method} : ${req.originalUrl}`);
        if(options.requestDelayTimeout){
            await new Promise((r) => setTimeout(r, options.requestDelayTimeout||1000));

        }
            return next();
    }
}


export default ReqLogger