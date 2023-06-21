import React from "react";
import { CalCronTask } from "types/interface";
import { nanoid } from "nanoid";
import styles from './Field.module.css';

type Props = {
    values: CalCronTask,
    handleChange: (event: React.ChangeEvent<any>) => void,
}
const daysOfWeek: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeeklyField: React.FC<Props> = ({ values, handleChange }) => {

    const checkboxGroupElements = Array(daysOfWeek.length).fill('').map((el, index) => {
        const id: string = nanoid();
        return (
            <div className={`${styles.field__chooseBox} ${values.weekly.days.includes(`${index}`) && styles.field__chooseBox_active}`} key={id}>
                <input type="checkbox" name="weekly.days" id={id} checked={values.weekly.days.includes(`${index}`)} value={index} onChange={handleChange} />
                <label htmlFor={id}>{daysOfWeek[index]}</label>
            </div>
        );
    });

    return (
        <div className={styles.field}>
            <div className={styles.field__radioBox}>
                < input
                    type="radio"
                    name="taskType"
                    id="weekly"
                    value={'weekly'}
                    checked={values.taskType === 'weekly'}
                    onChange={handleChange}
                />
                <label htmlFor="weekly">weekly</label>
            </div>
            <div className={`${styles.field__contentColumn} ${values.taskType !== 'weekly' ? 'field__disabled' : ''}`}>
                <p>Every:</p>
                <div className={styles.field__checkboxGroup}>
                    {checkboxGroupElements}
                </div>
                <div>
                    <span>At</span>
                    <input
                        className={styles.field__inputTime}
                        type="time"
                        name="weekly.time"
                        id="weeklyTime"
                        value={values.weekly.time}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default WeeklyField;