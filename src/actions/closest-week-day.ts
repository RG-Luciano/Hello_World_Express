const holiday = [
    new Date (2023, 3, 1),
    new Date (2023, 3, 7),
    new Date (2023, 3, 9),
    new Date (2023, 3, 21)
]

export default function closestWeekDay(date: Date){
    for(const currentDate of holiday) {
        if (date.getTime() === currentDate.getTime()) {
            return (`holiday  ` + date);
        }
    }
    return `it's not a holiday` + date;
}