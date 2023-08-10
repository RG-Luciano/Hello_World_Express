export type HttpStatus = 200 | 400 | 404 | 500

export interface ApiPayload<T> {
    data: T
    status: HttpStatus
    errorMessages: string[]
}