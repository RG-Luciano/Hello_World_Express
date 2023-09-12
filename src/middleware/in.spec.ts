import { Request, Response, NextFunction } from "express";
import { dateValidation } from "./in";
import httpMocks from "node-mocks-http";
import { sendBadRequest, sendUnexpectedError } from "./out";

jest.mock("./out", () => ({
  sendBadRequest: jest.fn(),
  sendUnexpectedError: jest.fn(),
}));

describe("Testing the function dateValidation", () => {
  it("When date is valid", () => {
    const req: Request = httpMocks.createRequest({
      query: { date: "2023-08-31" },
    });
    const res: Response = httpMocks.createResponse();
    const next: NextFunction = jest.fn();

    dateValidation(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.locals.date).toEqual(new Date("2023-08-31T00:00:00"));
  });

  it("When date is not a String", () => {
    const req: Request = httpMocks.createRequest({
      query: { date: 23 },
    });
    const res: Response = httpMocks.createResponse();
    const next: NextFunction = jest.fn();

    dateValidation(req, res, next);

    expect(sendBadRequest).toHaveBeenCalledWith(res, "Date must be a string");
    expect(next).not.toHaveBeenCalled();
  });

  it("When date is empty", () => {
    const req: Request = httpMocks.createRequest({
      query: { date: "" },
    });
    const res: Response = httpMocks.createResponse();
    const next: NextFunction = jest.fn();

    dateValidation(req, res, next);

    expect(sendBadRequest).toHaveBeenCalledWith(res, "Date must not be empty");
    expect(next).not.toHaveBeenCalled();
  });

  it("Date is invalid", () => {
    const req: Request = httpMocks.createRequest({
      query: { date: "2023-04-3a" },
    });
    const res: Response = httpMocks.createResponse();
    const next: NextFunction = jest.fn();

    dateValidation(req, res, next);

    expect(sendBadRequest).toHaveBeenCalledWith(res, "Invalid Date");
    expect(next).not.toHaveBeenCalled();
  });

  it("Req object is invalid", () => {
    const req: Request = httpMocks.createRequest({
    });
    const res: Response = httpMocks.createResponse();
    const next: NextFunction = jest.fn();

    (req as any).query = undefined;
    dateValidation(req, res, next);

    expect(sendUnexpectedError).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
