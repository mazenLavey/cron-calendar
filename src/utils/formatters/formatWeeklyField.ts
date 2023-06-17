import { CalendarFrom } from "types/interface";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const formatWeeklyField = (values: CalendarFrom): string => {
    let outputText: string = '';

    const daysOfWeek: string[] = values.selectedDaysInWeek.map(Number).sort((a, b) => a - b).map(dayNum => days[dayNum]);
    let daysToText: string = '';

    if (daysOfWeek.length > 1) {
        const lastDay = daysOfWeek.pop();
        daysToText = daysOfWeek.join(', ') + ', and ' + lastDay;
    } else {
        daysToText = daysOfWeek.join(', ');
    }

    if (daysToText.length > 0) {
        outputText = `on ${daysToText}`;
    }

    return outputText
}

export default formatWeeklyField;