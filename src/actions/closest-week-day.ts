const holiday = [
    new Date(2023, 3, 1),
    new Date(2023, 3, 7),
    new Date(2023, 3, 9),
    new Date(2023, 3, 21)
];

function isWeekday(date: Date) {
    const dayOfWeek = date.getDay();
    if(dayOfWeek >= 1 && dayOfWeek <= 5){
        return true
    }else{
        return false
    }
}

function isHoliday(date: Date) {
    return holiday.some(h => h.toDateString() === date.toDateString())
}

export function closestWeekDay(date: Date): Date {
    let newDate = new Date(date)
    
    if (isWeekday(newDate) && !isHoliday(newDate)) return newDate
    else return closestWeekDay(new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1))
}
export function closestWeekDayBefore(date: Date) {
    let newDate = new Date(date)
    
    if (isWeekday(newDate) && !isHoliday(newDate)) return newDate
    else return closestWeekDayBefore(new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - 1))
}