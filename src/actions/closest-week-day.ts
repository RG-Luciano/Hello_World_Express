const holiday = [
    new Date(2023, 3, 1),
    new Date(2023, 3, 7),
    new Date(2023, 3, 9),
    new Date(2023, 3, 21)
];

function isWeekday(date: Date) {
    const dayOfWeek = date.getDay();
    return dayOfWeek >= 1 && dayOfWeek <= 5
}

function isHoliday(date: Date) {
    return holiday.some(h => h.toDateString() === date.toDateString())
}

export default function closestWeekDay(date: Date) {
    let newDate = new Date(date)
    
    while (true) {
        if (isWeekday(newDate) && !isHoliday(newDate)) {
            return  newDate.toDateString()
        }
        newDate.setDate(newDate.getDate() + 1)
    }
}