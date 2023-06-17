


export type MonthlyOperation = 'rangeOfMonths' | 'selectedMonths';
export type DailyOperation = 'rangeOfDays' | 'selectedDays';

export type AtTime = {
    id: string,
    value: string
}

export interface CalendarFrom {
    calId: string;
    atTime: AtTime[],

    daily: boolean
    dailyOperationType: DailyOperation;
    rangeOfDays: string;
    selectedDays: string;

    monthly: boolean;
    monthlyOperationType: MonthlyOperation;
    rangeOfMonths: string;
    selectedMonth: string[];

    weekly: boolean,
    selectedDaysInWeek: string[],
}
