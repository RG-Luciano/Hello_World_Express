import { NextFunction, Request, Response } from "express";
import { errorHandler, outputHandler} from "../middleware/out";
import { ApiPayload } from '../types';

export function inputHandler(req: Request, res: Response, next: NextFunction){
    console.log("request intercepted here")
        const dateString = req.query.date;
        const date = new Date(dateString + 'T00:00:00');
        const payload: ApiPayload<Date> = {
            data: date,
            status: 200,
            errorMessages: []
        }
        outputHandler(req, res, payload)
        return payload.data

    
}