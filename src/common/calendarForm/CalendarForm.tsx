import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { CalendarFormSchema } from 'schema/formSchema';
import MonthlyField from './components/MonthlyField';
import { CalendarFrom } from 'types/interface';
import DailyField from './components/DailyField';
import WeeklyField from './components/WeeklyField';
import TimeField from './components/TimeField';
import objToCron from 'logic/objToCron/objToCron';
import cronToWords from 'logic/cronToWords/cronToWords';
import styles from './CalendarForm.module.css';
import { CronContext } from 'context/CronContext';

const CalendarForm: React.FC = () => {
    const { currentCalendar, addCal } = useContext(CronContext);

    const submitForm = (value: CalendarFrom) => {
        addCal(value)
    }

    const { values, errors, isValid, touched, setFieldValue, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
        initialValues: currentCalendar,
        onSubmit: submitForm,
        validationSchema: CalendarFormSchema
    });

    // Reset the form when currentCalendar changes
    useEffect(() => {
        resetForm({ values: currentCalendar });
    }, [currentCalendar, resetForm]);

    const inWords = (): string => {
        const result = cronToWords(values, isValid);
        return result;
    }

    const inCron = (): string => {
        // if (!isValid) return '* * * * *'

        const result = objToCron(values);
        return result;
    }

    // console.log(values)

    return (
        <div className={styles.calendar}>
            <form className={styles.calendar__form} onSubmit={handleSubmit}>
                <TimeField
                    values={values}
                    handleChange={setFieldValue}
                    handleBlur={handleBlur}
                />
                <DailyField
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    touched={touched}
                    errors={errors}
                />
                <MonthlyField
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
                <WeeklyField
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
                <q className={styles.calendar__ToWords}>
                    {inWords()}
                </q>
                <p className={styles.calendar__ToCron}>
                    {inCron()}
                </p>

                <button className='btn btn-primary btn-centered' type='submit'>save</button>
            </form >
        </div>
    )
}

export default CalendarForm;