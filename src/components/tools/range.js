

export default function range(start, end, step=1) {
    var arr = []
    for (let i = start; i < end; i += step) {
        arr.push(i)
    }
    return arr
}