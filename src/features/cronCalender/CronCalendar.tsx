import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import MonthlyField from './components/MonthlyField';
import WeeklyField from './components/WeeklyField';
import DailyEachMinuteField from './components/DailyEachMinuteField';
import DailyAtTimeField from './components/DailyAtTimeField';
import { CalCronTask } from 'types/interface';
import objToCron from './logic/objToCron';
import styles from './CronCalendar.module.css';
import cronstrue from 'cronstrue';

type Props = {
    data: CalCronTask;
    changeUserInput: (newInput: string) => void,
    children: React.ReactNode
}

const CronCalendar: React.FC<Props> = ({ data, children, changeUserInput }) => {

    const sendData = (val: CalCronTask) => {
        const result = objToCron(val);
        changeUserInput(result);
    }

    const { values, setFieldValue, handleChange, resetForm, handleSubmit } = useFormik<CalCronTask>({
        initialValues: data,
        onSubmit: sendData
    });

    // Reset the form when currentCalendar changes
    useEffect(() => {
        resetForm({ values: data });
    }, [data, resetForm]);

    // cron to words
    const inWords = (val: CalCronTask): string => {
        const cron = objToCron(val);
        const phrase = cronstrue.toString(cron, { use24HourTimeFormat: true });

        return phrase;
    }

    return (
        <form className={styles.calendar__wrapper} onSubmit={handleSubmit}>
            <div className={styles.calendar}>
                <WeeklyField
                    values={values}
                    handleChange={handleChange}
                />
                <DailyEachMinuteField
                    values={values}
                    handleChange={handleChange}
                />
                <DailyAtTimeField
                    values={values}
                    handleChange={handleChange}
                    handleTime={setFieldValue}
                />
                <MonthlyField
                    values={values}
                    handleChange={handleChange}
                />
                <q className={styles.calendar__inWords}>{inWords(values)}</q>
            </div>
            {children}
        </form >
    )
}

export default React.memo(CronCalendar);