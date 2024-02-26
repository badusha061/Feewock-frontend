function formatDate  (dateString) {
    const  date = new Date(dateString)
    const formatter = new Intl.DateTimeFormat('en-US', {
        month:'short',
        day:'numeric',
        year:'numeric'
    });
    return formatter.format(date)
}

export {formatDate}