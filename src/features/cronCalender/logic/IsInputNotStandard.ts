import { dailyAtTimeTask, dailyEachMinuteTask, monthTask, weeklyTask } from "utils/regexPatterns/regexPatterns";


const IsInputNotStandard = (input: string): boolean => {
    const result = input.match(dailyEachMinuteTask) || input.match(monthTask) || input.match(weeklyTask) || input.match(dailyAtTimeTask) ? false : true;
    return result
}

export default IsInputNotStandard;