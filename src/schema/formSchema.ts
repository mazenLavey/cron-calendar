import { dailyRangeRegexNum, dailySeparatorRegex } from 'utils/regexPatterns/regexPatterns';
import * as yup from 'yup';
import { isValidCron } from 'cron-validator';

const dailyRangeMatchesMessage = 'numbers between 1 and 31, in this format: 2-15.';
const selectedDaysMessage = 'numbers between 1 and 31, in this format: 2,10,13.';

export const CalendarFormSchema = yup.object({
    rangeOfDays: yup.string().matches(dailyRangeRegexNum, dailyRangeMatchesMessage),
    selectedDays: yup.string().matches(dailySeparatorRegex, selectedDaysMessage),
})

const validateInputToCron = (expression: string | undefined) => {
    if (typeof expression === "string") {
        if (isValidCron(expression, { alias: true })) {
            console.log('isValid');
            return true;
        }
        return false;
    }
};

export const UserInputSchema = yup.object({
    userInput: yup.string()
        .test('cronValidation', 'Invalid cron expression', (value) => {
            return validateInputToCron(value);
        })
});