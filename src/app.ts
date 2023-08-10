import type { Request, Response } from 'express'
import express from 'express'
import as, { isError, sum } from './utils'
import { interceptor } from './interceptor'

const app = express()
const port = 3000

// popular os tesu dados
// quais vao ser os feriados

// status check
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

// status check
app.get('/closest-week-day', interceptor) 

app.listen(port,()=>{
    console.log(`App listen on port ${port}`, as(1, 2), sum(2, 3))
})