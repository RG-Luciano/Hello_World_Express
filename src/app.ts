import {closestWeekDay, closestWeekDayBefore} from "./actions/closest-week-day";
import type { Request, Response } from 'express'
import express from 'express'
import as, { isError, sum } from './utils'
import { ApiPayload } from './types';

const app = express()
const port = 3000

// popular os tesu dados
// quais vao ser os feriados

// status check
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

function interceptor(closestDay:(date: Date)=> Date){
    return function(req: Request, res: Response){
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
            result.data = closestDay(date)
        }catch (error: unknown){
            result.status = 400
            result.errorMessages = [isError(error) ? error.message : 'Unknown error']
        }
        finally{
            const { status, ...rest } = result
            res.status(result.status).send(rest)
        }
    }
    
}

// status check
app.get('/closest-week-day', interceptor(closestWeekDay), (req: Request, res: Response)=>{
    
}) 
app.get('/closest-week-day-before',interceptor(closestWeekDayBefore),(req: Request, res: Response)=>{

}) 

app.listen(port,()=>{
    console.log(`App listen on port ${port}`, as(1, 2), sum(2, 3))
}) 