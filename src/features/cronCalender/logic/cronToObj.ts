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
        const value = convertToObj(cronString);
        return { status: true, value: value };
    } else {
        return { status: false, value: null };
    }
}

export default cronToObj;

const convertToObj = (userInput: string): CalCronTask => {
    const inputToArray = userInput.trim().split(' ');
    const [mintues, hours, , months, weekdays] = inputToArray;
    let eachMintue: string = '1';

    // find the task type
    let taskType: TaskType = 'dailyAtTime';
    if (weekdays === '*' && months !== "*") {
        taskType = 'monthly';
    } else if (weekdays !== '*' && months === "*") {
        taskType = 'weekly';
    } else if (userInput.match(dailyEachMinuteTask)) {
        taskType = 'dailyEachMinute';
        eachMintue = mintues.slice(2,).replace(/^0+(?=\d)/, '');
    }

    // process time
    const resultTime = processTime(mintues, hours);

    // process Month
    const resultMonths = processMonthly(months);
    // process Weekly
    const selectedDaysInWeek = processWeekly(weekdays);

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
            minutes: eachMintue,
        },
        monthly: {
            months: resultMonths?.result,
            time: resultTime.length > 0 ? resultTime[0]?.value : "00:00"
        }
    }
    return newCaledarObj;
}

