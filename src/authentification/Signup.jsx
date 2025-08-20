import {motion} from 'framer-motion';
import styles from "../style/ModularStyle.module.scss";
import {useFormik} from "formik";
import {SchemaSingUp} from "../schemas/SchemaSingUp";
import {useNavigate} from "react-router-dom";
import {useAuthenticationContext} from "../contexts/AuthenticationProvider";
import {ADD_USER, PUT_NOTIFICATION} from "../constants/actionTypes";
import React, {useCallback} from "react";
import useLocalStorage from "../customsHooks/useLocalStorage";
import {IoIosCreate} from "react-icons/io";
import {useTodoContext} from "../contexts/TodoProvider";
import {NotificationBox} from "../components/NotificationBox";
import {FaTimes, FaCheck} from "react-icons/fa";
import { VscSignIn } from "react-icons/vsc";

export const Signup = React.memo(() => {
    const {dispatch} = useAuthenticationContext();
    const {state, dispatch: dispatchTodo} = useTodoContext();
    const navigate = useNavigate();
    const [, setUsersStorage] = useLocalStorage("listUsers", []);

    const onSubmit = useCallback((values) => {
        dispatch({type: ADD_USER, payload: values});
        setUsersStorage((prevState) =>  [...prevState, values]);
        dispatchTodo({type: PUT_NOTIFICATION, payload: `${values.fullName} Your Account Create Successfully`});
        setTimeout(() => navigate("/login"), 1500);
    //eslint-disable-next-line
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
       { state.notification ? <NotificationBox /> : null }
       <motion.div className={styles.headBox} initial={{color: '#eee'}} animate={{color: '#222', transition: {duration: 0.5}}}>
           <h2 className={styles.titlePage}>Sing Up Page</h2>
           <IoIosCreate/>
       </motion.div>
       <form className={`${styles.container} ${styles.formContainer}`} onSubmit={handleSubmit}>
           <div aria-label={"group-form"} className={`${styles.groupForm}`}>
               <label htmlFor="identifier">Identifier</label>
               <input type="text" id="identifier"
                      className={errors.identifier ? styles.invalid : styles.valid}
                      autoComplete={"username"} name="identifier" value={values.identifier}
                      onChange={handleChange} onBlur={handleBlur} placeholder="Identifier Name"/>
               { errors.identifier && touched.identifier ? <FaTimes className={`${styles.icon} ${styles.iconFeedBack} ${styles.iconFeedBackErrors}`}/> : <FaCheck className={`${styles.icon} ${styles.iconFeedBack} ${styles.iconFeedBackValid}`}/>}
               { errors.identifier && touched.identifier ? (<motion.span initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1, transition: {duration: 0.5}}}>{errors.identifier}</motion.span>) : null}
           </div>
           <div aria-label={"group-form"} className={`${styles.groupForm}`}>
               <label htmlFor="FullName">Full Name</label>
               <input type="text" id="FullName"
                      className={errors.fullName ? styles.invalid : styles.valid} name="fullName"
                      value={values.fullName} onChange={handleChange}
                      onBlur={handleBlur} placeholder="Full Name"/>
               { errors.fullName && touched.fullName ? <FaTimes className={`${styles.icon} ${styles.iconFeedBack} ${styles.iconFeedBackErrors}`}/> : <FaCheck className={`${styles.icon} ${styles.iconFeedBack} ${styles.iconFeedBackValid}`}/>}
               { errors.fullName && touched.fullName ? (<motion.span initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1, transition: {duration: 0.5}}}>{errors.fullName}</motion.span>) : null}
           </div>
           <div aria-label={"group-form"} className={`${styles.groupForm}`}>
               <label htmlFor="email">Email</label>
               <input type="email" autoComplete={"email"} id="email"
                      className={errors.email ? styles.invalid : styles.valid} name="email"
                      value={values.email}
                      onChange={handleChange} onBlur={handleBlur} placeholder="Email"/>
               { errors.email && touched.email ? <FaTimes className={`${styles.icon} ${styles.iconFeedBack} ${styles.iconFeedBackErrors}`}/> : <FaCheck className={`${styles.icon} ${styles.iconFeedBack} ${styles.iconFeedBackValid}`}/>}
               { errors.email && touched.email ? (<motion.span initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1, transition: {duration: 0.5}}}>{errors.email}</motion.span>) : null}
           </div>
           <div aria-label={"group-form"} className={`${styles.groupForm}`}>
               <label htmlFor="password">Password</label>
               <input type="password" id="password"
                      className={errors.password ? styles.invalid : styles.valid}
                      autoComplete={"current-password"} name="password"
                      value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder="Password"/>
               { errors.password && touched.password ? <FaTimes className={`${styles.icon} ${styles.iconFeedBack} ${styles.iconFeedBackErrors}`}/> : <FaCheck className={`${styles.icon} ${styles.iconFeedBack} ${styles.iconFeedBackValid}`}/>}
               { errors.password && touched.password ? (<motion.span initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1, transition: {duration: 0.5}}}>{errors.password}</motion.span>) : null}
           </div>
           <div aria-label={"group-form"} className={`${styles.groupForm}`}>
               <label htmlFor="confirmPassword">Confirm Password</label>
               <input type="password" id="confirmPassword"
                      className={errors.confirmPassword ? styles.invalid : styles.valid}
                      autoComplete={"current-password"} name="confirmPassword"
                      value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}
                      placeholder="Confirm Password"/>
               { errors.confirmPassword && touched.confirmPassword ? <FaTimes className={`${styles.icon} ${styles.iconFeedBack} ${styles.iconFeedBackErrors}`}/> : <FaCheck className={`${styles.icon} ${styles.iconFeedBack} ${styles.iconFeedBackValid}`}/>}
               { errors.confirmPassword && touched.confirmPassword ? (<motion.span initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1, transition: {duration: 0.5}}}>{errors.confirmPassword}</motion.span>) : null}
           </div>
           <motion.button
               initial={{scale: 1.5}}
               animate={{
                   scale: 1,
                   transition: {duration: 0.5},
               }}
               whileTap={{
                   scale: 0.9,
               }}
               className={styles.styleBtn} aria-label={'Button To Sing Up In The Todo App'} type={"submit"}><VscSignIn /><span>Sing Up</span>
           </motion.button>
           <span>I'm Ready Have Account ?<span className={styles.link} onClick={() => navigate(-1)}>Login</span></span>
       </form>
   </>)
});