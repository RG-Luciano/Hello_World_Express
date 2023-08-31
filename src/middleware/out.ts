import type { Response } from "express";
import { isError } from "../utils";

export function errorHandler(res: Response, err: unknown) {
  if (isError(err)) res.status(500).send({ message: err.message });
  else res.status(500).send({ message: "unknown error" });
}

export function sendSuccess(res: Response, data: unknown) {
  res.status(200).send({ data });
}

export function sendBadRequest(
  res: Response,
  message: string,
  errorMessages?: string[]
) {
  res.status(400).send({ message, errorMessages });
}

export function sendUnexpectedError(
  res: Response,
  message = "Unexpected error occurred..."
) {
  res.status(500).send({ message });
}
