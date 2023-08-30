import type { NextFunction, Request, Response } from 'express'
import express from 'express'
import as, { sum } from './utils'
import { inputHandler} from "./middleware/in";
import { closestWeekDay, closestWeekDayBefore } from './actions/closest-week-day';
import { handlerDay } from './middleware/out';

const app = express()
const port = 3003
const router = express.Router()

// isso ta sendo usado pra que?
router.use(inputHandler,(req: Request, res: Response, next: NextFunction) => {
    console.log("request intercepted here..", req.query)
    next()
})

// adicionei esse endpoint pq a gente tinha anteriormente
// chama ele no postman, ve o que acontece
// e me fala o que entendes... ao colocar "http://localhost:3003/" o retorno no postman deveria ser a mensagem
// que esta escrita ai, no entanto ta retornando erro.
router.get('/',(req, res)=>{
    res.status(200).send({ message: "the api works..." })
})

router.get('/closest-week-day',(req, res)=>{
    handlerDay(req, res, closestWeekDay)
})

router.get('/closest-week-day-before', (req, res)=>{
    handlerDay(req, res, closestWeekDayBefore)
})

app.use('/', router)

app.listen(port,()=>{
    console.log(`App listen on port ${port}`, as(1, 2), sum(2, 3))
}) 