const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

module.exports.monthConverter = (month) => {
    // might not be needed. Was implementing this for another idea with the Date object, but I found a better way to do it
    return months[month];
}

module.exports.dateToString = (month, day, year) => {
    // outputs the date in a Jan 1, 1970 format
    /* TODO: Ensure that this is still outputting in the desired format.
     *  This was working with the blogPost inserts, but seemed to break for the requests inserts.
     *  ex:
     *          in the request model, I have it look the same way it is in the blog post model
     *          the blog post model seemed to work to where I didn't have to call the monthConverter method
     *          now that I have the request model, this seems to not be the case anymore.
     */
    return `${this.monthConverter(month)} ${day}, ${year}`;
}