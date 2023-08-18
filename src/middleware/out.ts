import type { Request, Response, NextFunction } from "express";
import { ApiPayload } from "../types";

export function errorHandler(res: Response, err: unknown){
    res.status(500).send({})
}
export function outputHandler<T>(req: Request, res: Response, payload: ApiPayload<T>){
    const { status, ...rest } = payload
    res.status(status).send(rest)
}