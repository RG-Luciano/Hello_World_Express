import type { NextFunction, Request, Response } from 'express'
import express from 'express'
import as, { sum } from './utils'
import { errorHandler, outputHandler} from "./middleware/out";
import { inputHandler} from "./middleware/in";
import { ApiPayload } from './types';
import { closestWeekDay, closestWeekDayBefore } from './actions/closest-week-day';

const app = express()
const port = 3003
const router = express.Router()

router.use((req: Request, res: Response, next: NextFunction) => {
    console.log("request intercepted here..", req.query)
    
    next()
})

router.get('/closest-week-day',(req: Request, res: Response, next: NextFunction)=>{
    console.log(closestWeekDay(inputHandler(req, res, next)))

})

router.get('/closest-week-day-before',async(req: Request, res: Response, next: NextFunction)=>{
    console.log(closestWeekDayBefore(inputHandler(req, res, next)))
    
})

app.use('/', router)

app.listen(port,()=>{
    console.log(`App listen on port ${port}`, as(1, 2), sum(2, 3))
}) 