import type { Request, Response, NextFunction } from "express";
import { ApiPayload } from "../types";

export function outputHandler<T>(req: Request, res: Response, payload: ApiPayload<T>){
    const { status, ...rest } = payload
    res.status(status).send(rest)
}