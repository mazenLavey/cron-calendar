import CalendarForm from "common/calendarForm/CalendarForm";
import styles from './Home.module.css';
import StoredCronCalendar from "common/storedCronCalendar/StoredCronCalendar";
import UserInputInCron from "common/userInputInCron/UserInputInCron";

const Home: React.FC = () => {
    return (
        <main className={`${styles.Home__wrapper} container`}>
            <UserInputInCron />
            <div className={styles.Home__dashboard}>
                <CalendarForm />
                <StoredCronCalendar />
            </div>
        </main>
    )
}

export default Home;