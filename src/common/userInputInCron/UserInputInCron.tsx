import { useContext } from 'react';
import styles from './UserInputInCron.module.css';
import cronToObj from 'logic/cronToObj/cronToObj';
import { useFormik } from 'formik';
import { UserInputSchema } from 'schema/formSchema';
import { CronContext } from 'context/CronContext';

type UserInput = {
    userInput: string
}

const UserInputInCron: React.FC = () => {
    const { addCal } = useContext(CronContext);

    const handleLoad = (value: UserInput) => {
        const getObj = cronToObj(value.userInput);
        addCal(getObj);
        resetForm();
    }

    const { values, errors, handleChange, handleBlur, handleSubmit, resetForm, touched } = useFormik({
        initialValues: { userInput: '' },
        validationSchema: UserInputSchema,
        onSubmit: handleLoad
    })

    return (
        <>
            <form className={styles.userInput__Form} onSubmit={handleSubmit}>
                <input
                    className={styles.userInput__inputBox}
                    type="text"
                    name='userInput'
                    id='userInput'
                    value={values.userInput}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='* * * * *'
                />
                <button
                    className={`btn btn-primary ${styles.userInput__btn}`}
                    type='submit'
                >load
                </button>
            </form>
            <p className={styles.userInput__errorField}>
                {touched.userInput && errors && errors.userInput}
            </p>
        </>
    )
}
export default UserInputInCron;