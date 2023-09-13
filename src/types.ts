import { Response } from "express";

export type HttpStatus = 200 | 400 | 404 | 500;

export interface DateHandler {
  _: any;
  res: Response<any, Record<string, Date>>;
}

export class BadRequestError extends Error {
  readonly status: number;
  constructor(message: string) {
    super(message);

    this.status = 400;
  }
}
