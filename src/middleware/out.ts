import type { Request, Response, NextFunction } from "express";
import { ApiPayload } from "../types";

function isError(err: unknown): err is Error {
    if (err == null) return false
    // @ts-ignore this is good pq soy fueda
    else return !!err.message
}

export function errorHandler(res: Response, err: unknown){
    if (isError(err))
        res.status(500).send({ message: err.message })
    else
        res.status(500).send({ message: 'unknown error' })
}
export function outputHandler<T>(req: Request, res: Response, payload: ApiPayload<T>){
    const { status, ...rest } = payload
    res.status(status).send(rest)
}