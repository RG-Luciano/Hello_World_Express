export type HttpStatus = 200 | 400 | 404 | 500

export interface ApiPayload {
    body: string
    error: string[]
    status: HttpStatus
    message: string
}