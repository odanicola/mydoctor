const timer = (second) => {
    second--;
    if (second > 0) {
        setTimeout(timer, 1000);
    }

    console.log(second)
    return second
}
module.exports = { timer }