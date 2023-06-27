import { CalCronTask } from "types/interface";


const objToCron = (taskObj: CalCronTask): string => {
    let taskInCron: string = '';
    if (taskObj.taskType === 'weekly') {
        taskInCron = processWeeklyData(taskObj);
    } else if (taskObj.taskType === 'dailyAtTime') {
        taskInCron = processDailyAtTimeData(taskObj);

    } else if (taskObj.taskType === 'dailyEachMinute') {
        taskInCron = processDailyEachMinuteData(taskObj);

    } else if (taskObj.taskType === 'monthly') {
        taskInCron = processMonthlyData(taskObj);
    }

    return taskInCron;
}

export default objToCron;

const processWeeklyData = (taskObj: CalCronTask): string => {
    const hour: string = taskObj.weekly.time.slice(0, 2);
    const minutes: string = taskObj.weekly.time.slice(3, 5);
    const weekdays: string = taskObj.weekly.days.map(Number).sort((a, b) => a - b).join(',');


    const result: string = `${minutes.length === 2 && minutes.startsWith('0') ? minutes[1] : minutes} ${hour.length === 2 && hour.startsWith('0') ? hour[1] : hour} * * ${weekdays.length > 0 ? weekdays : '*'}`;
    return result;
}

const processDailyAtTimeData = (taskObj: CalCronTask): string => {
    let arrayMinute: string[] = taskObj.dailyAtTime.time.map(el => el.value.slice(3, 5)).map(el => el.startsWith('0') && el.length > 1 ? el[1] : el);
    let minute: string = arrayMinute.length === 0 ? '*' : arrayMinute[0];

    let arrayHour: string[] = taskObj.dailyAtTime.time.map(el => el.value.slice(0, 2)).map(el => el.startsWith('0') && el.length > 1 ? el[1] : el);
    let hour: string = arrayHour.length === 0 ? '*' : arrayHour.join(',');

    const result: string = `${minute} ${hour} * * *`;
    return result;
}

const processDailyEachMinuteData = (taskObj: CalCronTask): string => {
    const minutes: string = taskObj.dailyEachMinute.minutes
    const result: string = `${minutes.length === 2 && minutes.startsWith('0') ? `*/${minutes[1]}` : `*/${minutes}`} * * * *`;

    return result;
}

const processMonthlyData = (taskObj: CalCronTask): string => {
    const hour: string = taskObj.monthly.time.slice(0, 2);
    const minutes: string = taskObj.monthly.time.slice(3, 5);
    const months: string = taskObj.monthly.months.map(Number).sort((a, b) => a - b).join(',');

    const result: string = `${minutes.length === 2 && minutes.startsWith('0') ? minutes[1] : minutes} ${hour.length === 2 && hour.startsWith('0') ? hour[1] : hour} * ${months.length > 0 ? months : '*'} *`;
    return result;
}