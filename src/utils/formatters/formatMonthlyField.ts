import { CalendarFrom } from "types/interface";

const months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const formatMonthlyField = (values: CalendarFrom): string => {
    let text: string = '';
    if (values.monthlyOperationType === "rangeOfMonths") {
        // filtering data so the output will be unique and sorted
        const sortMonths: number[] = values.rangeOfMonths.split('-').map(Number).sort((a, b) => a - b);
        const uniqueSet: Set<number> = new Set(sortMonths);
        const range: string[] = Array.from(uniqueSet).map(monthNum => months[monthNum]);

        text = range.length === 1 ? `in ${range[0]}` : `in every month from ${range[0]} through ${range[1]}`;

    } else if (values.monthlyOperationType === "selectedMonths") {
        const selectedMonths: string[] = values.selectedMonth.map(Number).sort((a, b) => a - b).map(monthNum => months[monthNum]);
        let monthsToText: string = '';

        if (selectedMonths.length > 1) {
            const lastMonth = selectedMonths.pop();
            monthsToText = selectedMonths.join(', ') + ', and ' + lastMonth;
        } else {
            monthsToText = selectedMonths.join(', ');
        }

        if (monthsToText.length > 0) {
            text = `in ${monthsToText}`;
        }
    }

    return text
}

export default formatMonthlyField;