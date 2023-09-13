import { BadRequestError } from "./types";
import { isBadRequestError, isError } from "./utils";

describe(`when checking if an unknown is a normal error`, () => {
  it(`should return false if we send a null or undefined`, () => {
    expect(isError(null)).toBe(false);
    expect(isError(undefined)).toBe(false);
  });
  it(`should return true`, () => {
    const error = new Error("mensagem teste error");
    expect(isError(error)).toBe(true);
  });
  it(`should return false`, () => {
    const error = `muda so a mensagem`;
    expect(isError(error)).toBe(false);
  });
  it(`should return true if the object looks like an error`, () => {
    const error = { message: `muda so a mensagem` };
    expect(isError(error)).toBe(true);
  });
});

describe(`when checking if an unknown is a bad request error`, () => {
  it(`should return false if we send a null or undefined`, () => {
    expect(isBadRequestError(null)).toBe(false);
    expect(isBadRequestError(undefined)).toBe(false);
  });
  it(`should return true`, () => {
    const error = new BadRequestError('erro');
    expect(isBadRequestError(error)).toBe(true);
  });
  it(`should return false`, () => {
    const error = `muda so a mensagem`;
    expect(isBadRequestError(error)).toBe(false);
  });
  it(`should return true if the object looks like a bad request error`, () => {
    const error = { message: `muda so a mensagem`, status: 400 };
    expect(isBadRequestError(error)).toBe(true);
  });
});