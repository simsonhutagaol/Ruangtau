function formatDOB(datetimeString) {
    const dob = new Date(datetimeString);
    const formattedDOB = dob.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    return formattedDOB;
}
module.exports = formatDOB