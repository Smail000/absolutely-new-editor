import randomInt from "./randomInt"

export default function range(start, end, randomStart, randomEnd) {
    var arr = []
    for (let i = start; i < end; i++) {
        arr.push(randomInt(randomStart, randomEnd))
    }
    return arr
}