import React from "react";
import { CalCronTask } from "types/interface";
import styles from './Field.module.css';
import { FormikErrors, FormikTouched } from "formik";

type Props = {
    values: CalCronTask,
    handleChange: (event: React.ChangeEvent<any>) => void,
    handleBlur: (event: React.ChangeEvent<any>) => void,
    touched: FormikTouched<CalCronTask>,
    errors: FormikErrors<CalCronTask>
}

const DailyEachMinuteField: React.FC<Props> = ({ values, handleChange, handleBlur, errors, touched }) => {
    return (
        <div className={`${styles.field} ${styles.field__alignCenter}`}>
            <div className={styles.field__radioBox}>
                < input
                    type="radio"
                    name="taskType"
                    id="dailyEachMinute"
                    value={'dailyEachMinute'}
                    checked={values.taskType === 'dailyEachMinute'}
                    onChange={handleChange}
                />
                <label htmlFor="dailyEachMinute">Daily</label>
            </div>
            <div className={`${styles.field__contentRow} ${values.taskType !== 'dailyEachMinute' ? 'field__disabled' : ''}`}>
                <span>each</span>
                <input
                    className={styles.field__inputBox}
                    type="number"
                    name="dailyEachMinute.minutes"
                    id="dailyTime"
                    value={values.dailyEachMinute.minutes}
                    onChange={handleChange}
                    min={1}
                    max={59}
                />
                <span>minutes</span>
            </div>
        </div>
    )
}

export default DailyEachMinuteField;