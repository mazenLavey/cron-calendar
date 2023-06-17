import { nanoid } from "nanoid";
import { createContext, useState, useEffect } from "react";
import { CalendarFrom } from "types/interface";

type Props = {
    children: React.ReactNode
}

interface CronContextType {
    calendarData: CalendarFrom[],
    currentCalendar: CalendarFrom,
    addCal: (newCal: CalendarFrom) => void,
    deleteCal: (calId: string) => void,
    addToCurrentCalendar: (calId: string) => void,
    addNewCal: () => void
}

const CronContext = createContext<CronContextType>({
    calendarData: [],
    currentCalendar: {
        calId: nanoid(),
        atTime: [],

        daily: false,
        dailyOperationType: 'selectedDays',
        rangeOfDays: '',
        selectedDays: '',

        monthly: false,
        monthlyOperationType: 'selectedMonths',
        rangeOfMonths: '',
        selectedMonth: [],

        weekly: false,
        selectedDaysInWeek: [],
    },
    addCal: (newCal) => { },
    deleteCal: (calId) => { },
    addToCurrentCalendar: (calId) => { },
    addNewCal: () => { }
});

const CronProvider: React.FC<Props> = ({ children }) => {
    const [calendarData, setCalendarData] = useState<CalendarFrom[]>([]);
    const [currentCalendar, setCurrentCalendar] = useState<CalendarFrom>({
        calId: nanoid(),
        atTime: [],

        daily: false,
        dailyOperationType: 'selectedDays',
        rangeOfDays: '',
        selectedDays: '',

        monthly: false,
        monthlyOperationType: 'selectedMonths',
        rangeOfMonths: '',
        selectedMonth: [],

        weekly: false,
        selectedDaysInWeek: [],
    });

    useEffect(() => {
        const localData: string | null = localStorage.getItem('cronCalendarData');
        if (localData !== null) {
            setCalendarData(JSON.parse(localData));
        }
    }, []);

    useEffect(() => {
        if (calendarData.length === 0) return
        localStorage.setItem('cronCalendarData', JSON.stringify(calendarData));
    }, [calendarData]);

    const addCal = (newCal: CalendarFrom): void => {
        setCalendarData(prev => {
            if (prev.filter(el => el.calId === newCal.calId).length > 0) {
                return prev.map(el => el.calId === newCal.calId ? newCal : el);
            } else {
                return [newCal, ...prev];
            }
        });
    }
    const addNewCal = (): void => {
        const newCal: CalendarFrom = {
            calId: nanoid(),
            atTime: [],

            daily: false,
            dailyOperationType: 'selectedDays',
            rangeOfDays: '',
            selectedDays: '',

            monthly: false,
            monthlyOperationType: 'selectedMonths',
            rangeOfMonths: '',
            selectedMonth: [],

            weekly: false,
            selectedDaysInWeek: [],
        };

        addCal(newCal);
    }
    const deleteCal = (calId: string): void => {
        const updatedArray = calendarData.filter(el => el.calId !== calId);
        setCalendarData(updatedArray);
    }

    const addToCurrentCalendar = (calId: string): void => {
        const findCal = calendarData?.find(el => el.calId === calId);
        if (findCal) {
            setCurrentCalendar(findCal);
        }
    }

    return (
        <CronContext.Provider value={{ calendarData, currentCalendar, addCal, deleteCal, addToCurrentCalendar, addNewCal }}>
            {children}
        </CronContext.Provider>
    )
}

export { CronContext, CronProvider }