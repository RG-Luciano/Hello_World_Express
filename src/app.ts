import type { NextFunction, Request, Response } from 'express'
import express from 'express'
import as, { sum } from './utils'
import { errorHandler, outputHandler } from "./middleware/out";
import { ApiPayload } from './types';

const app = express()
const port = 3003
const router = express.Router()

router.use((req: Request, res: Response, next: NextFunction) => {
    console.log("request intercepted here", req.query)
    next()
})

router.get('/sample', (req: Request, res: Response, next: NextFunction) => {
    try {
        const flag = 1
        if (1 == flag)
            throw new Error('error caught here')
        else {
            const payload: ApiPayload<string> = {
                data: `all good`,
                status: 200,
                errorMessages: []
            }
            outputHandler(req, res, payload)
        }
    } catch(err: unknown){
        errorHandler(res, err)
    }
})

app.use('/', router)

app.listen(port,()=>{
    console.log(`App listen on port ${port}`, as(1, 2), sum(2, 3))
}) 