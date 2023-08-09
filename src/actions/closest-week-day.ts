export default function closestWeekDay(date: Date){
    const  holiday = [
        new Date (2023, 3, 1),
        new Date (2023, 3, 7),
        new Date (2023, 3, 9),
        new Date (2023, 3, 21)

    ]
    for(let i in holiday){
        if (date.getTime() === holiday[i].getTime()) {
            return (`holiday  ` + date);
        }
    }
    return `it's not a holiday` + date;
}