import type { Request, Response } from 'express'
import express from 'express'
import as, { isError, sum } from './utils'
import closestWeekDay from './actions/closest-week-day'
import { ApiPayload } from './types'

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
    const result: ApiPayload = {
        body: '',
        status: 200,
        errorMessage: '',
    }
    try{
        const dateString = req.query.date; 
        if (typeof dateString != 'string') throw new Error('Date must be a string')

        if (!dateString) throw new Error('Date must not be empty')
        const date = new Date(dateString + 'T00:00:00');
        if (isNaN(date.getTime())) throw new Error('Invalid Date')
        result.body = JSON.stringify({ closestWeekDay: closestWeekDay(date) })
    }catch (error: unknown){
        result.status = 400
        result.errorMessage = isError(error) ? error.message : 'Unknown error'
    }
    finally{
        const { status, ...rest } = result
        res.status(result.status).send(rest)
    }

})

app.listen(port,()=>{
    console.log(`App listen on port ${port}`, as(1, 2), sum(2, 3))
})