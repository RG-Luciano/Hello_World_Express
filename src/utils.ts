export function sum(a: number, b: number) {
    return a + b
}

export function isError(err: unknown): err is Error {
    if (err == null) return false
    else {
        // @ts-ignore this is valid
        return !!err.message
    }
}

function diff(a: number, b: number) {
    return a - b
}
export default diff