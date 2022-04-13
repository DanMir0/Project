export default function array_to_object (arr) {
    let obj = {}
    arr.forEach(item => {
        obj[item.key] = item.value
    })
    return obj
}
