import { NextFunction } from "express";

export function inputHandler(req: Request, res: Response, next: NextFunction){
    console.log("request intercepted here")
    return next()
}