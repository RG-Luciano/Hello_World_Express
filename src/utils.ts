export function sum(a: number, b: number) {
    return a + b
}

export function isError(err: unknown): err is Error {
    if (err == null) return false
    // @ts-ignore this is valid
    else return !!err.message
}

function diff(a: number, b: number) {
    return a - b
}
export default diff