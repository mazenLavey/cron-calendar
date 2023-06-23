
export type AtTime = {
    id: string,
    value: string
}

type WeeklyType = {
    days: string[],
    time: string
}

type DailyAtTimeType = {
    time: AtTime[]
}

type DailyEachMinuteType = {
    minutes: string,
}

type MonthlyType = {
    months: string[],
    time: string
}

export type TaskType = 'weekly' | 'dailyEachMinute' | 'dailyAtTime' | 'monthly'


export interface CalCronTask {
    id: string,
    taskType: TaskType,
    weekly: WeeklyType,
    dailyEachMinute: DailyEachMinuteType,
    dailyAtTime: DailyAtTimeType,
    monthly: MonthlyType
}