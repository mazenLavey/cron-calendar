import { CalendarFrom } from "types/interface";
import formatMonthlyField from 'utils/formatters/formatMonthlyField';
import formatDailyField from 'utils/formatters/formatDailyField';
import formatWeeklyField from 'utils/formatters/formatWeeklyField';
import formatTimeField from 'utils/formatters/formatTimeField';

const cronToWords = (values: CalendarFrom, isValid: boolean): string => {
    const preText: (string)[] = [];

    if (isValid) {
        const timeText = formatTimeField(values);
        preText.push(timeText);
    }

    if (values.daily && isValid) {
        const dailyText = formatDailyField(values);
        preText.push(dailyText);
    }

    if (values.weekly && isValid) {
        const weeklyText = formatWeeklyField(values);
        preText.push(weeklyText);
    }

    if (values.monthly && isValid) {
        const monthlyText = formatMonthlyField(values);
        preText.push(monthlyText);
    }

    const text: string = preText.filter(el => el !== '').join(', ');
    return text
}

export default cronToWords;