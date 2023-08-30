import type { Request, Response, NextFunction } from "express";
import { ApiPayload } from "../types";

function isError(err: unknown): err is Error {
    if (err == null) return false
    // @ts-ignore this is good pq soy fueda
    else return !!err.message
}

export function errorHandler(res: Response, err: unknown, next: NextFunction){
    if (isError(err))
        res.status(500).send({ message: err.message})
    else
        res.status(500).send({ message: 'unknown error' })
}
export function outputHandler<T>(req: Request, res: Response, payload: ApiPayload<T>){
    const { status, ...rest } = payload
    res.status(status).send(rest)
}
export function handlerDay<T>(req:Request, res: Response, calculate:(date: Date)=> T){
    const date = res.locals.date as Date
    const result = calculate(date)
    res.send({
        data: result,
        status: 200,
    })
}