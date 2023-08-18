import { NextFunction } from "express";

export function action(next: NextFunction){
    console.log('actuam endpoint implementation')
    next()
}