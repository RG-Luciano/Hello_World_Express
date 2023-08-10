import closestWeekDay from "./actions/closest-week-day";
import { Request, Response } from "express";
import { ApiPayload } from './types';
import { isError } from './utils';

export function interceptor(req: Request, res: Response){
    const result: ApiPayload<Date> = {
        data: new Date(),
        status: 200,
        errorMessages: [],
    }
    try{
        const dateString = req.query.date; 
        if (typeof dateString != 'string') throw new Error('Date must be a string')

        if (!dateString) throw new Error('Date must not be empty')
        const date = new Date(dateString + 'T00:00:00');
        if (isNaN(date.getTime())) throw new Error('Invalid Date')
        result.data = closestWeekDay(date)
    }catch (error: unknown){
        result.status = 400
        result.errorMessages = [isError(error) ? error.message : 'Unknown error']
    }
    finally{
        const { status, ...rest } = result
        res.status(result.status).send(rest)
    }
}