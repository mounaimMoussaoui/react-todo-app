import React from "react";
import styles from "../style/ModularStyle.module.scss";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {schemaLoginSchema} from "../schemas/SchemaLogin";
import {useTodoContext} from "../contexts/TodoProvider";
import {SET_USER} from "../constants/actionTypes";
import useSession from "../customsHooks/useSession";

export const Login = React.memo(() => {
    const navigate = useNavigate();
    const [userSession, setUserSession] = useSession( "user", null);
    const {dispatch} = useTodoContext();

    const {values,  errors, touched, handleChange, handleBlur} = useFormik({
        initialValues: {
            identifier: '',
            password: '',
        },
        validationSchema: schemaLoginSchema,
        onsubmit,
    });

    function handleSubmit(e) {
        e.preventDefault();
        const {identifier, password} = values;
        if (identifier && identifier === 'user101' && password && password === 'Admin101') {
            const user = {identifier, password};
            setUserSession(user);
            dispatch({type: SET_USER, payload: userSession});
        }
    }

    return (<>
        <h2 className={styles.titlePage}>Authentication Page</h2>
        <form onSubmit={handleSubmit} className={`${styles.container} ${styles.formContainer}`}>
            <div aria-label={"login-identifier"} className={styles.groupForm}>
                <label htmlFor="identifier">Identifier</label>
                <input type="text" id="identifier" className={errors.identifier ? styles.invalid : styles.valid} autoComplete={"username"} name="identifier" value={values.identifier} onChange={handleChange} onBlur={handleBlur}  placeholder="Identifier Name"/>
                { errors.identifier && touched.identifier ? (<span>{errors.identifier}</span>) : null}
            </div>
            <div aria-label={"login-password"} className={styles.groupForm}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className={errors.password ? styles.invalid : styles.valid} autoComplete={"current-password"} name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder="Password"/>
                { errors.password && touched.password ? (<span>{errors.password}</span>) : null}
            </div>
            <button className={styles.styleBtn} aria-label={'Login in to the todo Using your identifier and password'} type={"submit"}>Login In</button>
            <span>I want To Sing Up ?<span className={styles.link} onClick={() => navigate('/singUp')}>Sing Up</span></span>
        </form>
        </>
    )
})