import { AtTime, CalendarFrom } from "types/interface";
import processWeekly from "./processWeekly";
import processMonthly from "./processMonthly";
import processDaily from "./processDaily";
import processTime from "./processTime";
import { nanoid } from "nanoid";


const cronToObj = (userInput: string): CalendarFrom => {
    const inputToArray = userInput.trim().split(' ');

    // process time
    const cronMintues: string = inputToArray[0];
    const cronHours: string = inputToArray[1];
    const resultTime: AtTime[] = processTime(cronMintues, cronHours);

    // process dayMonth
    const cronDayMonth: string = inputToArray[2];
    const resultDayMonth = processDaily(cronDayMonth)

    // process Month
    const cronMonth: string = inputToArray[3];
    const resultMonths = processMonthly(cronMonth);

    // process dayWeek
    const cronDayWeek: string = inputToArray[4];
    const selectedDaysInWeek = processWeekly(cronDayWeek);


    const newCaledarObj: CalendarFrom = {
        calId: nanoid(),
        atTime: resultTime,

        daily: cronDayMonth?.includes('*') ? false : true,
        dailyOperationType: resultDayMonth.operationType,
        rangeOfDays: resultDayMonth.value,
        selectedDays: resultDayMonth.value,

        monthly: cronMonth?.includes('*') ? false : true,
        monthlyOperationType: resultMonths.operationType,
        rangeOfMonths: resultMonths.valueRange,
        selectedMonth: resultMonths.valueSelect,

        weekly: cronDayWeek?.includes('*') ? false : true,
        selectedDaysInWeek: selectedDaysInWeek.result
    }
    console.log(newCaledarObj)
    return newCaledarObj;
}

export default cronToObj;
