import { useContext, useState } from 'react';
import { CronContext } from 'context/CronContext';
import styles from './Home.module.css';
import CronCalendar from "features/cronCalender/CronCalendar";
import cronToObj from 'features/cronCalender/logic/cronToObj';

const Home: React.FC = () => {
    const { calendarData, loadToCalendar } = useContext(CronContext);
    const [userInput, setUserInput] = useState<string>('');
    const [isInputError, setIsInputError] = useState<Boolean>(false);

    const loadData = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        const result = cronToObj(userInput);

        if (result.status && result.value) {
            setIsInputError(false);
            loadToCalendar(result.value);
        } else {
            setIsInputError(true);
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserInput(e.target.value);
    }

    const changeUserInput = (newInput: string): void => {
        setUserInput(newInput);
    }

    return (
        <main className={`${styles.home__wrapper} container`}>
            <div className={styles.home__dashboard}>
                <CronCalendar data={calendarData} changeUserInput={changeUserInput}>
                    <div className={styles.testInput}>
                        <div className={styles.testInput__btns}>
                            <button className={styles.testInput__btns_load} onClick={loadData} type='button'>load</button>
                            <button className={styles.testInput__btns_save} type='submit'>save</button>
                        </div>
                        <input
                            className={`${styles.testInput__textBox} ${isInputError ? styles.testInput__textBox_error : ''}`}
                            type="text"
                            name="userInput"
                            id="userInput"
                            value={userInput}
                            onChange={handleInput}
                            placeholder='* * * * *'
                        />
                        {isInputError ?
                            <p className={styles.testInput__errorMessage}>use a correct format</p>
                            :
                            null
                        }
                    </div>
                </CronCalendar>
            </div>
        </main>
    )
}

export default Home;