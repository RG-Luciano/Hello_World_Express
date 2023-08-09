import type { Request, Response } from 'express'
import express from 'express'
import as, { sum } from './utils'
import closestWeekDay from './actions/closest-week-day'

const app = express()
const port = 3000

// popular os tesu dados
// quais vao ser os feriados

// status check
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

// status check
app.get('/closest-week-day', (req: Request, res: Response) => {
    const dateString = req.query.date as string; 
    const date = new Date(dateString);
    try{
        if (isNaN(date.getTime())) {
            throw new Error()
        }else{
            res.send(closestWeekDay(date))
        }
    }catch (error){
        res.status(400).send('Invalid Date');
    }
})

app.listen(port,()=>{
    console.log(`App listen on port ${port}`, as(1, 2), sum(2, 3))
})