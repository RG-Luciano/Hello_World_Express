import type { Request, Response, NextFunction } from "express";
import { ApiPayload } from "../types";

function isError(err: unknown): err is Error {
    if (err == null) return false
    // @ts-ignore this is good pq soy fueda
    else return !!err.message
}

// onde isso ta sendo chamado
// lugar nenhum, quando criei o try catch o errorHandler deixou de ser usado, no entanto se eu usar ele no
// app.ts feito eu fiz com o inputHandler, caso tenha algum erro que nao seja relacionado ao usuario
// ele ira retornar o erro
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