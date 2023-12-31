import { weeklyRangeLetters, weeklyRangeNums, weeklySeparatorLetters, weeklySeparatorNums } from "utils/regexPatterns/regexPatterns";

const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

type Output = {
    result: string[]
}

const processWeekly = (inputValue: string): Output => {
    const value = inputValue.toLowerCase();
    let result: string[] = [];
    if (value === '*') {
        result = [];

    } else if (value.length === 1) {
        result = [value];

    } else if (value.match(weeklySeparatorNums)) {
        result = value.trim().split(',');

    } else if (value.match(weeklyRangeNums)) {
        const range = indexesFromRangeNum(value);
        result = range;

    } else if (value.match(weeklyRangeLetters)) {
        const range = indexesFromRangLetters(value);
        result = range;

    } else if (value.match(weeklySeparatorLetters)) {
        const days = value.trim().split(',');
        result = days.map(el => weekdays.indexOf(el)).map(String);
    }

    return { result };
}

export default processWeekly;

const indexesFromRangeNum = (range: string): string[] => {
    const indexes: string[] = [];

    const parts = range.split('-');
    const start = parseInt(parts[0]);
    const end = parseInt(parts[1]);

    const sortedStart = Math.min(start, end);
    const sortedEnd = Math.max(start, end);

    if (sortedStart >= 0 && sortedStart <= 6 && sortedEnd >= 0 && sortedEnd <= 6) {
        for (let i = sortedStart; i <= sortedEnd; i++) {
            indexes.push(i.toString());
        }
    }
    return indexes;
};

const indexesFromRangLetters = (range: string): string[] => {
    const indexes: string[] = [];

    const parts = range.split('-');
    const startDay = parts[0].toLowerCase();
    const endDay = parts[1].toLowerCase();

    const startIndex = weekdays.indexOf(startDay);
    const endIndex = weekdays.indexOf(endDay);

    const sortedStartIndex = Math.min(startIndex, endIndex);
    const sortedEndIndex = Math.max(startIndex, endIndex);

    if (sortedStartIndex !== -1 && sortedEndIndex !== -1) {
        for (let i = sortedStartIndex; i <= sortedEndIndex; i++) {
            indexes.push(i.toString());
        }
    }
    return indexes;
};
