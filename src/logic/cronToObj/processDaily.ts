import { DailyOperation } from "types/interface";
import { dailyRangeRegexNum, dailySeparatorRegex } from "utils/regexPatterns/regexPatterns";

const separatorRegex = dailySeparatorRegex;
const rangeRegexNum = dailyRangeRegexNum;

type TypeOP = 'range' | 'select'

type Output = {
    operationType: DailyOperation,
    value: string
}

const processDaily = (inputValue: string): Output => {
    let type: TypeOP = 'select';
    let result: string = '';

    if (inputValue === '*') {
        result = '';
        type = 'select';

    } else if (inputValue.match(separatorRegex)) {
        result = inputValue;
        type = 'select';

    } else if (inputValue.match(rangeRegexNum)) {
        result = inputValue;
        type = 'range'
    }

    return { operationType: type === 'range' ? 'rangeOfDays' : 'selectedDays', value: result };
}

export default processDaily;


