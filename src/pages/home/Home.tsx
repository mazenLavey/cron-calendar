import { useContext, useState } from 'react';
import { CronContext } from 'context/CronContext';
import styles from './Home.module.css';
import CronCalendar from "features/cronCalender/CronCalendar";
import cronToObj from 'features/cronCalender/logic/cronToObj';
import IsInputNotStandard from 'features/cronCalender/logic/IsInputNotStandard';
import { IoWarning, IoCloseCircle } from "react-icons/io5";

const warningMessage = "Input format doesn't match calendar standard. Edit using calendar";

const Home: React.FC = () => {
    const { calendarData, loadToCalendar } = useContext(CronContext);
    const [userInput, setUserInput] = useState<string>('');
    const [isInputError, setIsInputError] = useState<Boolean>(false);
    const [isNotStandard, setIsNotStandard] = useState<Boolean>(false);

    const loadData = (): void => {
        const result = cronToObj(userInput);

        if (result.status && result.value) {
            setIsInputError(false);
            checkWarnings(userInput);
            loadToCalendar(result.value);
        } else {
            setIsInputError(true);
        }
    }

    const checkWarnings = (inputInCron: string): void => {
        let checkStandard = IsInputNotStandard(inputInCron.trim());
        setIsNotStandard(checkStandard);
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            loadData();
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserInput(e.target.value);
    }

    const changeUserInput = (newInput: string): void => {
        setUserInput(newInput);
        checkWarnings(newInput);
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
                            className={`${styles.testInput__textBox} ${isInputError ? styles.testInput__textBox_error : ''} ${isNotStandard ? styles.testInput__textBox_warning : ''}`}
                            type="text"
                            name="userInput"
                            id="userInput"
                            value={userInput}
                            onChange={handleInput}
                            onKeyDown={handleKeyDown}
                            placeholder='* * * * *'
                        />
                        {isInputError ?
                            <p className={styles.testInput__message}><IoCloseCircle className='icon icon_error' /> Use a correct format</p>
                            :
                            null
                        }
                        {isNotStandard ?
                            <p className={styles.testInput__message}><IoWarning className='icon icon_warning' /> {warningMessage}</p>
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