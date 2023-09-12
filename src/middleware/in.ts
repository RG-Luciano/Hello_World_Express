import { NextFunction, Request, Response } from "express";
import { sendBadRequest, sendUnexpectedError } from "./out";
import { isBadRequestError } from "../utils";
import { BadRequestError } from "../types";

export function dateValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const dateString = req.query.date;

    if (typeof dateString != "string") throw new BadRequestError("Date must be a string");
    if (!dateString) throw new BadRequestError("Date must not be empty");
    const date = new Date(dateString + "T00:00:00");
    if (isNaN(date.getTime())) throw new BadRequestError("Invalid Date");

    res.locals.date = date;
    next();
  } catch (err: unknown) {
    if (isBadRequestError(err)) sendBadRequest(res, err.message);
    else sendUnexpectedError(res);
  }
}
