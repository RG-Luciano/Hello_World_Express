import { NextFunction, Request, Response } from "express";
import { outputHandler} from "../middleware/out";
import { ApiPayload } from '../types';

export function inputHandler(req: Request, res: Response, next: NextFunction){
    console.log("request intercepted here")
    const dateString = req.query.date;
    
    try{
        
        if (typeof dateString != 'string') throw new Error('Date must be a string')
        if (!dateString) throw new Error('Date must not be empty')
        const date = new Date(dateString + 'T00:00:00')
        if (isNaN(date.getTime())) throw new Error('Invalid Date')
        res.locals.date = date
        next()
    }catch (error: any){
        const payload: ApiPayload<null> = {
            data: null,
            status: 400,
            errorMessages: [error.message]
        }   
        return outputHandler(req, res, payload)
    }

    
}