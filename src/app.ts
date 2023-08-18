import type { NextFunction, Request, Response } from 'express'
import express from 'express'
import as, { sum } from './utils'
import { outputHandler } from "./middleware/out";

const app = express()
const port = 3003
const router = express.Router()

router.use((req: Request, res: Response, next: NextFunction) => {
    console.log("request intercepted here", req.query)
    next()
})

router.get('/sample', (req: Request, res: Response, next: NextFunction) => {
    console.log("actual implementation")
    outputHandler(req, res, next)
})

app.use('/', router)

app.listen(port,()=>{
    console.log(`App listen on port ${port}`, as(1, 2), sum(2, 3))
}) 