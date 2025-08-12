import {motion} from 'framer-motion';
import styles from "../style/ModularStyle.module.scss";
import {useFormik} from "formik";
import {SchemaSingUp} from "../schemas/SchemaSingUp";
import {useNavigate} from "react-router-dom";
import {useAuthenticationContext} from "../contexts/AuthenticationProvider";
import {ADD_USER} from "../constants/actionTypes";
import React, {useCallback} from "react";
import useLocalStorage from "../customsHooks/useLocalStorage";

export const SingUp = React.memo(() => {
    const {dispatch} = useAuthenticationContext();
    const navigate = useNavigate();
    const [, setUsersStorage] = useLocalStorage("listUsers", []);
    const onSubmit = useCallback((values) => {
        dispatch({type: ADD_USER, payload: values});
        setUsersStorage((prevState) =>  [...prevState, values]);
    }, [dispatch]);

    const { values, errors, touched, handleChange,handleBlur, handleSubmit} = useFormik({
        initialValues: {
            identifier: '',
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: SchemaSingUp,
        onSubmit,
    });

   return (<>
       <motion.h2 initial={{color: '#eee'}} animate={{color: '#222', transition: {duration: 0.5}}} className={styles.titlePage}>Sing Up Page</motion.h2>
        <form className={`${styles.container} ${styles.formContainer}`} onSubmit={handleSubmit}>
           <div aria-label={"group-form"} className={`${styles.groupForm}`}>
               <label htmlFor="identifier">Identifier</label>
               <input type="text" id="identifier"
                      className={errors.identifier ? styles.invalid : styles.valid}
                      autoComplete={"username"} name="identifier" value={values.identifier}
                      onChange={handleChange} onBlur={handleBlur} placeholder="Identifier Name"/>
               {errors.identifier && touched.identifier ? (<motion.span initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1, transition: {duration: 0.5}}}>{errors.identifier}</motion.span>) : null}
           </div>
           <div aria-label={"group-form"} className={`${styles.groupForm}`}>
               <label htmlFor="FullName">Full Name</label>
               <input type="text" id="FullName"
                      className={errors.fullName ? styles.invalid : styles.valid} name="fullName"
                      value={values.fullName} onChange={handleChange}
                      onBlur={handleBlur} placeholder="Full Name"/>
               {errors.fullName && touched.fullName ? (<motion.span initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1, transition: {duration: 0.5}}}>{errors.fullName}</motion.span>) : null}
           </div>
           <div aria-label={"group-form"} className={`${styles.groupForm}`}>
               <label htmlFor="email">Email</label>
               <input type="email" autoComplete={"email"} id="email"
                      className={errors.email ? styles.invalid : styles.valid} name="email"
                      value={values.email}
                      onChange={handleChange} onBlur={handleBlur} placeholder="Email"/>
               {errors.email && touched.email ? (<motion.span initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1, transition: {duration: 0.5}}}>{errors.email}</motion.span>) : null}
           </div>
           <div aria-label={"group-form"} className={`${styles.groupForm}`}>
               <label htmlFor="password">Password</label>
               <input type="password" id="password"
                      className={errors.password ? styles.invalid : styles.valid}
                      autoComplete={"current-password"} name="password"
                      value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder="Password"/>
               {errors.password && touched.password ? (<motion.span initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1, transition: {duration: 0.5}}}>{errors.password}</motion.span>) : null}
           </div>
           <div aria-label={"group-form"} className={`${styles.groupForm}`}>
               <label htmlFor="confirmPassword">Confirm Password</label>
               <input type="password" id="confirmPassword"
                      className={errors.confirmPassword ? styles.invalid : styles.valid}
                      autoComplete={"current-password"} name="confirmPassword"
                      value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}
                      placeholder="Confirm Password"/>
               {errors.confirmPassword && touched.confirmPassword ? (<motion.span initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1, transition: {duration: 0.5}}}>{errors.confirmPassword}</motion.span>) : null}
           </div>
           <motion.button
               whileHover={{
                   scale: 1.05,
                   backgroundColor: '#e3734d'
               }}
               initial={{scale: 1.5}}
               animate={{
                   scale: 1,
                   transition: {duration: 0.5},
               }}
               className={styles.styleBtn} aria-label={'Button To Sing Up In The Todo App'} type={"submit"}>Sing
               Up
           </motion.button>
           <span>I'm Ready Have Account ?<span className={styles.link} onClick={() => navigate(-1)}>Login</span></span>
       </form>
   </>)
});