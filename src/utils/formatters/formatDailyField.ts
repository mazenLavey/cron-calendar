import { CalendarFrom } from "types/interface";

const formatDailyField = (values: CalendarFrom): string => {
    let text: string = '';
    if (values.dailyOperationType === "rangeOfDays") {
        // filtering data so the output will be unique and sorted
        const sortDays: number[] = values.rangeOfDays?.split('-').map(Number).sort((a, b) => a - b);
        const uniqueSet: Set<number> = new Set(sortDays);
        const range: number[] = Array.from(uniqueSet).filter(day => day !== 0);

        if (range.length > 0) {
            text = range.length === 1 ? `on day-of-month ${range[0]}` : `on every day-of-month from ${range[0]} through ${range[1]}`;
        }

    } else if (values.dailyOperationType === "selectedDays") {
        const selectedDays: number[] = values.selectedDays?.split(',').map(Number).sort((a, b) => a - b);
        const daysToText: string = selectedDays.filter(day => day !== 0).join(', ');

        if (daysToText.length > 0) {
            text = `on (${daysToText}) day-of-month`;
        }
    }

    return text
}

export default formatDailyField;