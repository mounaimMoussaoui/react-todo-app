import React, {useCallback, useEffect} from "react";
import styles from "../style/ModularStyle.module.scss";
import {useFormik} from "formik";
import {SchemaSingUp} from "../schemas/SchemaSingUp";
import {useNavigate} from "react-router-dom";
import {useAuthenticationContext} from "../contexts/AuthenticationProvider";
import {ADD_USER, SET_USER} from "../constants/actionTypes";

export const SingUp = React.memo(() => {
    const {dispatch} = useAuthenticationContext();
    const navigate = useNavigate();

    const onSubmit = (values) => {
        dispatch({type: SET_USER, payload: values});
    }

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
       <h2 className={styles.titlePage}>Sing Up Page</h2>
        <form className={`${styles.container} ${styles.formContainer}`} onSubmit={handleSubmit}>
           <div aria-label={"group-form"} className={`${styles.groupForm}`}>
               <label htmlFor="identifier">Identifier</label>
               <input type="text" id="identifier"
                      className={errors.identifier ? styles.invalid : styles.valid}
                      autoComplete={"username"} name="identifier" value={values.identifier}
                      onChange={handleChange} onBlur={handleBlur} placeholder="Identifier Name"/>
               {errors.identifier && touched.identifier ? (<span>{errors.identifier}</span>) : null}
           </div>
           <div aria-label={"group-form"} className={`${styles.groupForm}`}>
               <label htmlFor="FullName">Full Name</label>
               <input type="text" id="FullName"
                      className={errors.fullName ? styles.invalid : styles.valid} name="fullName"
                      value={values.fullName} onChange={handleChange}
                      onBlur={handleBlur} placeholder="Full Name"/>
               {errors.fullName && touched.fullName ? (<span>{errors.fullName}</span>) : null}
           </div>
           <div aria-label={"group-form"} className={`${styles.groupForm}`}>
               <label htmlFor="email">Email</label>
               <input type="email" autoComplete={"email"} id="email"
                      className={errors.email ? styles.invalid : styles.valid} name="email"
                      value={values.email}
                      onChange={handleChange} onBlur={handleBlur} placeholder="Email"/>
               {errors.email && touched.email ? (<span>{errors.email}</span>) : null}
           </div>
           <div aria-label={"group-form"} className={`${styles.groupForm}`}>
               <label htmlFor="password">Password</label>
               <input type="password" id="password"
                      className={errors.password ? styles.invalid : styles.valid}
                      autoComplete={"current-password"} name="password"
                      value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder="Password"/>
               {errors.password && touched.password ? (<span>{errors.password}</span>) : null}
           </div>
           <div aria-label={"group-form"} className={`${styles.groupForm}`}>
               <label htmlFor="confirmPassword">Confirm Password</label>
               <input type="password" id="confirmPassword"
                      className={errors.confirmPassword ? styles.invalid : styles.valid}
                      autoComplete={"current-password"} name="confirmPassword"
                      value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}
                      placeholder="Confirm Password"/>
               {errors.confirmPassword && touched.confirmPassword ? (<span>{errors.confirmPassword}</span>) : null}
           </div>
           <button className={styles.styleBtn} aria-label={'Button To Sing Up In The Todo App'} type={"submit"}>Sing
               Up
           </button>
           <span>I'm Ready Have Account ?<span className={styles.link} onClick={() => navigate(-1)}>Login</span></span>

       </form>
   </>)
});