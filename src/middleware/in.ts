import { NextFunction, Request, Response } from "express";
import { sendBadRequest, sendUnexpectedError } from "./out";
import { isError } from "../utils";

export function dateValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const dateString = req.query.date;

    if (typeof dateString != "string") throw new Error("Date must be a string");
    if (!dateString) throw new Error("Date must not be empty");
    const date = new Date(dateString + "T00:00:00");
    if (isNaN(date.getTime())) throw new Error("Invalid Date");

    res.locals.date = date;
    next();
  } catch (err: unknown) {
    if (isError(err)) sendBadRequest(res, err.message);
    else sendUnexpectedError(res);
  }
}
