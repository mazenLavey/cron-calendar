import { CalCronTask, TaskType } from "types/interface";
import { isValidCron } from 'cron-validator'
import processTime from "./processTime";
import processMonthly from "./processMonthly";
import processWeekly from "./processWeekly";
import { nanoid } from "nanoid";
import { dailyEachMinuteTask } from "utils/regexPatterns/regexPatterns";

type Output = {
    status: boolean,
    value: CalCronTask | null
}

const cronToObj = (cronString: string): Output => {
    if (isValidCron(cronString.trim(), { alias: true, allowBlankDay: true })) {
        console.log('vaild')
        const value = convertToObj(cronString);
        return { status: true, value: value };
    } else {
        return { status: false, value: null };
    }
}

export default cronToObj;

const convertToObj = (userInput: string): CalCronTask => {
    const inputToArray = userInput.trim().split(' ');

    // process time
    const cronMintues: string = inputToArray[0];
    const cronHours: string = inputToArray[1];
    const resultTime = processTime(cronMintues, cronHours);
    // console.log(resultTime)
    // process Month
    const cronMonth: string = inputToArray[3];
    const resultMonths = processMonthly(cronMonth);

    // process Weekly
    const cronDayWeek: string = inputToArray[4];
    const selectedDaysInWeek = processWeekly(cronDayWeek);

    let taskType: TaskType = 'dailyAtTime';
    if (cronDayWeek === '*' && cronMonth !== "*") {
        taskType = 'monthly';
    } else if (cronDayWeek !== '*' && cronMonth === "*") {
        taskType = 'weekly';
    } else if (userInput.match(dailyEachMinuteTask)) {
        taskType = 'dailyEachMinute';
    }


    const newCaledarObj: CalCronTask = {
        id: nanoid(),
        taskType: taskType,
        weekly: {
            days: selectedDaysInWeek?.result,
            time: resultTime.length > 0 ? resultTime[0]?.value : "00:00"
        },
        dailyAtTime: {
            time: resultTime,
        },
        dailyEachMinute: {
            minutes: cronMintues === "*" ? '1' : cronMintues,
        },
        monthly: {
            months: resultMonths?.result,
            time: resultTime.length > 0 ? resultTime[0]?.value : "00:00"
        }
    }
    return newCaledarObj;
}

