import React from "react";
import { CalendarFrom } from "types/interface";
import styles from './Field.module.css';
import { FormikErrors, FormikTouched } from "formik";

type Props = {
    values: CalendarFrom,
    handleChange: (event: React.ChangeEvent<any>) => void,
    handleBlur: (event: React.ChangeEvent<any>) => void,
    touched: FormikTouched<CalendarFrom>,
    errors: FormikErrors<CalendarFrom>
}

const DailyField: React.FC<Props> = ({ values, handleChange, handleBlur, errors, touched }) => {
    return (
        <div className={styles.field}>
            <div className={styles.field__checkbox}>
                < input
                    type="checkbox"
                    name="daily"
                    id="daily"
                    checked={values.daily}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <label htmlFor="daily">select day(s) in a month</label>
            </div>
            {!values.daily ? null :
                <>
                    <select
                        className={styles.field__selectBox}
                        name="dailyOperationType"
                        id="dailyOperationType"
                        value={values.dailyOperationType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={!values.daily}
                    >
                        <option value="selectedDays">choose day(s)</option>
                        <option value="rangeOfDays">range of days</option>
                    </select>

                    {values.dailyOperationType === 'rangeOfDays' ?
                        <>
                            <input
                                className={styles.field__inputBox}
                                type="text"
                                name='rangeOfDays'
                                id='rangeOfDays'
                                value={values.rangeOfDays}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p className="errorMessage">
                                {touched.rangeOfDays && errors && errors.rangeOfDays}
                            </p>
                        </>
                        :
                        <>
                            <input
                                className={styles.field__inputBox}
                                type="text"
                                name='selectedDays'
                                id='selectedDays'
                                value={values.selectedDays}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p className="errorMessage">
                                {touched.selectedDays && errors && errors.selectedDays}
                            </p>
                        </>
                    }
                </>
            }
        </div>
    )
}

export default DailyField;