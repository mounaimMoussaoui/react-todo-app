import React, {useCallback} from "react";
import styles from "../style/ModularStyle.module.scss";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import useSession from "../customsHooks/useSession";
import {motion} from 'framer-motion';
import useLocalStorage from "../customsHooks/useLocalStorage";
import {useTodoContext} from "../contexts/TodoProvider";
import {PUT_NOTIFICATION, SET_LOADING, SET_USER} from "../constants/actionTypes";
import {schemaLoginSchema} from "../schemas/SchemaLogin";
import { FaUserLock } from "react-icons/fa";
export const Login = React.memo(() => {
    const navigate = useNavigate();
    const [usersStorage] = useLocalStorage('listUsers', []);
    const [userSession, setUserSession] = useSession( "user", null);
    const {dispatch} = useTodoContext();

    const onSubmit = useCallback((values) => {
        const {identifier, password} = values;
        const existUser = usersStorage.filter((user) => {
            return user.identifier === identifier;
        });
        if (identifier && identifier === existUser[0]?.identifier && password && password === existUser[0]?.password) {
            const user = {identifier, password};
            setUserSession(user);
            dispatch({type: SET_USER, payload: userSession});
            navigate('/');
            dispatch({type: PUT_NOTIFICATION, payload: `Welcome You're Login Now ${existUser.fullName}!!`});
        }
    }, []);

    const {values,  errors, touched, handleChange, handleBlur, handleSubmit} = useFormik({
        initialValues: {
            identifier: '',
            password: '',
        },
        validationSchema: schemaLoginSchema,
        onSubmit,
    });

    return (<>
            <motion.div className={styles.headBox} initial={{color: '#eee'}} animate={{color: '#222', transition: {duration: 0.5}}}>
                <h2 className={styles.titlePage}>Authentication Page</h2>
                <FaUserLock/>
            </motion.div>
            <form onSubmit={handleSubmit} className={`${styles.container} ${styles.formContainer}`}>
            <div aria-label={"login-identifier"} className={styles.groupForm}>
                <label htmlFor="identifier">Identifier</label>
                <input type="text" id="identifier" className={errors.identifier ? styles.invalid : styles.valid} autoComplete={"username"} name="identifier" value={values.identifier} onChange={handleChange} onBlur={handleBlur} placeholder="Identifier Name"/>
                { errors.identifier && touched.identifier ? (<motion.span initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1, transition: {duration: 0.5}}} exit={{opacity: 0}}>{errors.identifier}</motion.span>) : null}
            </div>
            <div aria-label={"login-password"} className={styles.groupForm}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className={errors.password ? styles.invalid : styles.valid} autoComplete={"current-password"} name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder="Password"/>
                { errors.password && touched.password ? (<motion.span initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1, transition: {duration: 0.5}}} exit={{opacity: 0}}>{errors.password}</motion.span>) : null}
            </div>
            <motion.button
                whileHover={{
                    marginTop: -5,
                    backgroundColor: '#042f32'
                }}
                initial={{
                    scale: 1.05,
                }}
                animate={{
                    scale: 1,
                    transition: { duration: 0.5}
                }}
                className={styles.styleBtn} aria-label={'Login in to the todo Using your identifier and password'} type={"submit"}>Login In</motion.button>
            <motion.span initial={{scale: 0.7, opacity: 0}} animate={{scale: 1, opacity: 1, transition: {duration: 0.3}}} exit={{opacity: 0}}>I want To Sing Up ?<span className={styles.link} onClick={() => navigate('/signup')} >Sing Up</span></motion.span>
        </form>
        </>
    )
});