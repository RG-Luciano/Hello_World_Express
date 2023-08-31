export function isError(err: unknown): err is Error {
    if (err == null) return false
    // @ts-ignore this is valid
    else return !!err.message
}