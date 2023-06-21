import { monthlyRangeLetters, monthlyRangeNums, monthlySeparatorLetters, monthlySeparatorNums } from "utils/regexPatterns/regexPatterns";

const months = ['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

type Output = {
    result: string[]
}

const processMonthly = (inputValue: string): Output => {
    const value = inputValue.toLowerCase();
    let result: string[] = []
    if (value === '*') {
        result = [];

    } else if (value.match(monthlySeparatorNums)) {
        result = value.trim().split(',');

    } else if (value.match(monthlyRangeNums)) {
        const range = indexesFromRangeNum(value);
        result = range;

    } else if (value.match(monthlyRangeLetters)) {
        const range = indexesFromRangLetters(value);
        result = range;
    } else if (value.match(monthlySeparatorLetters)) {
        const monthsArray = value.trim().split(',');
        result = monthsArray.map(el => months.indexOf(el)).map(String);
    }

    return { result };
}

export default processMonthly;

const indexesFromRangeNum = (range: string): string[] => {
    const indexes: string[] = [];

    const parts = range.split('-');
    const start = parseInt(parts[0]);
    const end = parseInt(parts[1]);

    const sortedStart = Math.min(start, end);
    const sortedEnd = Math.max(start, end);

    if (sortedStart >= 1 && sortedStart <= 12 && sortedEnd >= 1 && sortedEnd <= 12) {
        for (let i = sortedStart; i <= sortedEnd; i++) {
            indexes.push(i.toString());
        }
    }

    return indexes;
};

const indexesFromRangLetters = (range: string): string[] => {
    const indexes: string[] = [];

    const parts = range.split('-');
    const startMonth = parts[0].toLowerCase();
    const endMonth = parts[1].toLowerCase();

    const startIndex = months.findIndex(month => month.toLowerCase() === startMonth);
    const endIndex = months.findIndex(month => month.toLowerCase() === endMonth);

    const sortedStartIndex = Math.min(startIndex, endIndex);
    const sortedEndIndex = Math.max(startIndex, endIndex);

    if (sortedStartIndex !== -1 && sortedEndIndex !== -1) {
        for (let i = sortedStartIndex; i <= sortedEndIndex; i++) {
            indexes.push((i + 1).toString());
        }
    }

    return indexes;
};
