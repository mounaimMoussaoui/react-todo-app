import React, {useCallback, useEffect} from "react";
import styles from "../style/ModularStyle.module.scss";
import {useFormik} from "formik";
import {SchemaSingUp} from "../schemas/SchemaSingUp";

export const SingUp = React.memo(() => {

    const { values, errors, touched, handleChange,handleBlur } = useFormik({
        initialValues: {
            identifier: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: SchemaSingUp,
        onsubmit,
    });

    useEffect(() => {
        console.log(errors, values);
    }, [values]);

   return (<form className={styles.container}>
       <div aria-label={"group-form"}>
           <label htmlFor="identifier">Identifier</label>
           <input type="text" id="identifier" autoComplete={"username"} name="identifier" value={values.identifier} onChange={handleChange} onBlur={handleBlur} placeholder="Identifier Name"/>
       </div>
       <div aria-label={"group-form"}>
           <label htmlFor="FirstName">First Name</label>
           <input type="text" id="FirstName" name="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} placeholder="First Name"/>
       </div>
       <div aria-label={"group-form"}>
           <label htmlFor="LastName">Last Name</label>
           <input type="text" id="LastName" name="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur} placeholder="Last Name"/>
       </div>
       <div aria-label={"group-form"}>
           <label htmlFor="email">Email</label>
           <input type="email" autoComplete={"email"} id="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder="Email"/>
       </div>
       <div aria-label={"group-form"}>
           <label htmlFor="password">Password</label>
           <input type="password" id="password" autoComplete={"current-password"} name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder="Password"/>
       </div>
       <div aria-label={"group-form"}>
           <label htmlFor="confirmPassword">Password</label>
           <input type="password" id="confirmPassword" autoComplete={"current-password"} name="confirmPassword" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} placeholder="Confirm Password"/>
       </div>
       <button className={styles.styleBtn} aria-label={'Button To Sing Up In The Todo App'} type={"submit"}>Sing Up</button>
   </form>)
});