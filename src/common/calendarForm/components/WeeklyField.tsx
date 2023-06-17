import React from "react";
import { CalendarFrom } from "types/interface";
import { nanoid } from "nanoid";
import styles from './Field.module.css';

type Props = {
    values: CalendarFrom,
    handleChange: (event: React.ChangeEvent<any>) => void,
    handleBlur: (event: React.ChangeEvent<any>) => void
}
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeeklyField: React.FC<Props> = ({ values, handleChange, handleBlur }) => {

    const checkboxGroupElements = Array(7).fill('').map((el, index) => {
        const id: string = nanoid();
        return (
            <div className={`${styles.field__chooseBox} ${values.selectedDaysInWeek.includes(`${index}`) && styles.field__chooseBox_active}`} key={id}>
                <input type="checkbox" name="selectedDaysInWeek" id={id} checked={values.selectedDaysInWeek.includes(`${index}`)} value={index} onChange={handleChange} />
                <label htmlFor={id}>{daysOfWeek[index]}</label>
            </div>
        );
    });

    return (
        <div className={styles.field}>
            <div className={styles.field__checkbox}>
                < input
                    type="checkbox"
                    name="weekly"
                    id="weekly"
                    checked={values.weekly}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <label htmlFor="weekly">select day(s) in a week</label>
            </div>
            {values.weekly ?
                <div className={styles.field__checkboxGroup}>
                    {checkboxGroupElements}
                </div>
                :
                null}
        </div>
    )
}

export default WeeklyField;