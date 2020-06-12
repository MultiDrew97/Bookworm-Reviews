const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

module.exports.monthConverter = (month) => {
    // might not be needed. Was implementing this for another idea with the Date object, but I found a better way to do it
    return months[month];
}

module.exports.dateToString = (month, day, year) => {
    // outputs the date in a Jan 1, 1970 format
    return `${month} ${day}, ${year}`;
}