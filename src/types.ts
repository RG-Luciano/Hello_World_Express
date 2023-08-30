import { Response } from "express"

export type HttpStatus = 200 | 400 | 404 | 500

export interface DateHandler {
    _: any,
    res: Response<any, Record<string, Date>>
}