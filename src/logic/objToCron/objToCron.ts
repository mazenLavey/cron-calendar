import { CalendarFrom } from "types/interface";


const objToCron = (values: CalendarFrom): any => {
    let arrayMinute: string[] = values.atTime.map(el => el.value.slice(3, 5)).map(el => el.startsWith('0') && el.length > 1 ? el[1] : el);
    let minute: string;

    if (arrayMinute.length === 0) {
        minute = '*';
    } else {
        minute = arrayMinute.join(',');
    }

    let arrayHour: string[] = values.atTime.map(el => el.value.slice(0, 2)).map(el => el.startsWith('0') && el.length > 1 ? el[1] : el);
    let hour: string;
    if (arrayHour.length === 0) {
        hour = '*';
    } else {
        hour = arrayHour.join(',');
    }

    let dayMonth: string = ''
    if (!values.daily) {
        dayMonth = '*';
    } else if (values.dailyOperationType === "selectedDays") {
        dayMonth = values.selectedDays
    } else if (values.dailyOperationType === "rangeOfDays") {
        const sortByDecrease: number[] = values.rangeOfDays.split('-').map(Number).sort((a, b) => a - b);
        const getUnique: Set<number> = new Set(sortByDecrease);
        const range: number[] = Array.from(getUnique)
        dayMonth = range.join('-');
    }

    let month: string = '';

    if (!values.monthly) {
        month = '*';
    } else if (values.monthlyOperationType === "selectedMonths") {
        month = values.selectedMonth.join(',')
    } else if (values.monthlyOperationType === "rangeOfMonths") {
        const sortByDecrease: number[] = values.rangeOfMonths.split('-').map(Number).sort((a, b) => a - b);
        const getUnique: Set<number> = new Set(sortByDecrease);
        const range: number[] = Array.from(getUnique)
        month = range.join('-');
    }


    let dayWeek: string = ''
    if (!values.weekly) {
        dayWeek = '*';
    } else {
        dayWeek = values.selectedDaysInWeek.join(',')
    }

    const cron: string = [minute, hour, dayMonth.length === 0 ? '*' : dayMonth, month.length === 0 ? '*' : month, dayWeek.length === 0 ? '*' : dayWeek].join(' ');
    return cron
}

export default objToCron;