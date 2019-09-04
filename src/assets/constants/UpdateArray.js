export default (currentArray, newValue) => {
    let arr = currentArray;
    if (!(arr.includes(newValue))) {
        arr.push(newValue);
    }
    return arr;
}