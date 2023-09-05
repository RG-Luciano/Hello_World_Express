import { Request, Response, NextFunction } from "express"
import { errorHandler, sendSuccess, sendBadRequest, sendUnexpectedError } from "./out"

describe("Testing the functions in out.ts",()=>{
    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;
    
      afterEach(() => {
        jest.clearAllMocks();
      });

    it("ErrorHandler show send 500 response with error message",()=>{
        const error = new Error("Test Error")
        errorHandler(mockResponse, error)
        expect(mockResponse.status).toHaveBeenCalledWith(500)
        expect(mockResponse.send).toHaveBeenCalledWith({message:"Test Error"})
    })

    it("sendSuccess should send a 200 response with data", () => {
        const data = { message: "Success" }
        sendSuccess(mockResponse, data)
        expect(mockResponse.status).toHaveBeenCalledWith(200)
        expect(mockResponse.send).toHaveBeenCalledWith({ data })
      })

    it("This is a 'Else' of ErrorHandler",()=>{
        const error = new Error("Unknown error")
        errorHandler(mockResponse, error)
        expect(mockResponse.status).toHaveBeenCalledWith(500)
        expect(mockResponse.send).toHaveBeenCalledWith({message:"Unknown error"})
    })

    it("sendBadRequest show status 400 with error message",()=>{
        const message = "Bad Request"
        const errorMessages = ["Error"]
        sendBadRequest(mockResponse, message, errorMessages)
        expect(mockResponse.status).toHaveBeenLastCalledWith(400)
        expect(mockResponse.send).toHaveBeenCalledWith({message, errorMessages})
    })
    
    it("sendUnexpectedError should send a 500 response with default message if no message is provided", () => {
        sendUnexpectedError(mockResponse)
        expect(mockResponse.status).toHaveBeenCalledWith(500)
        expect(mockResponse.send).toHaveBeenCalledWith({ message: "Unexpected error occurred..." })
      });
})