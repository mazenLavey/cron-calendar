import { MonthlyOperation } from "types/interface";
import { monthlyRangeRegexLetters, monthlyRangeRegexNum, monthlySeparatorRegex } from "utils/regexPatterns/regexPatterns";

const months = ['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const separatorRegex = monthlySeparatorRegex;
const rangeRegexNum = monthlyRangeRegexNum;
const rangeRegexLetters = monthlyRangeRegexLetters;

type TypeOP = 'range' | 'select'

type Output = {
    operationType: MonthlyOperation,
    valueRange: string,
    valueSelect: string[]
}

const processMonthly = (inputValue: string): Output => {
    const value = inputValue.toLowerCase();
    let type: TypeOP = 'select';

    let resultRange: string = '';
    let resultSelect: string[] = [];

    if (value === '*') {
        resultSelect = [];
        type = 'select';

    } else if (value.match(separatorRegex)) {
        resultSelect = value.trim().split(',');
        type = 'select';

    } else if (value.match(rangeRegexNum)) {
        const range = indexesFromRangeNum(value);
        resultRange = `${range[0]}-${range[range.length - 1]}`;
        type = 'range';

    } else if (value.match(rangeRegexLetters)) {
        const range = indexesFromRangLetters(value);
        resultRange = `${range[0]}-${range[range.length - 1]}`;
        type = 'range';
    }

    return { operationType: type === 'range' ? 'rangeOfMonths' : 'selectedMonths', valueRange: resultRange, valueSelect: resultSelect };
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
