import { BadRequestError } from "./types";

export function isError(err: unknown): err is Error {
  if (err == null) return false;
  // @ts-ignore this is valid
  else return !!err.message;
}

export function isBadRequestError(err: unknown): err is BadRequestError {
  if (err == null) return false;
  // @ts-ignore this is valid
  else return !!err.message && err.status === 400; }