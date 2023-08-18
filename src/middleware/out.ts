import type { Request, Response, NextFunction } from "express";

export function outputHandler(req: Request, res: Response, next: NextFunction){
    console.log("OUTPUT COMES OUT HERE")
    res.status(200).send({ message: "all good" })
    next()
}