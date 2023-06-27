import { createContext, useState } from "react";
import { CalCronTask } from "types/interface";

type Props = {
    children: React.ReactNode
}

interface CronContextType {
    calendarData: CalCronTask,
    loadToCalendar: (obj: CalCronTask) => void
}

const CronContext = createContext<CronContextType>({
    calendarData: {
        id: '',
        taskType: 'weekly',
        weekly: {
            days: [],
            time: '00:00'
        },
        dailyAtTime: {
            time: []
        },
        dailyEachMinute: {
            minutes: '1'
        },
        monthly: {
            months: [],
            time: '00:00'
        }
    },
    loadToCalendar: (obj) => { }
});

const CronProvider: React.FC<Props> = ({ children }) => {
    const [calendarData, setCalendarData] = useState<CalCronTask>({
        id: '',
        taskType: 'weekly',
        weekly: {
            days: [],
            time: '00:00'
        },
        dailyAtTime: {
            time: []
        },
        dailyEachMinute: {
            minutes: '1'
        },
        monthly: {
            months: [],
            time: '00:00'
        }
    });

    const loadToCalendar = (obj: CalCronTask): void => {
        setCalendarData(obj)
    }

    return (
        <CronContext.Provider value={{ calendarData, loadToCalendar }}>
            {children}
        </CronContext.Provider>
    )
}

export { CronContext, CronProvider }