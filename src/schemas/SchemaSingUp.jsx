import * as yup from 'yup';

export const SchemaSingUp = () => {

    const regularsRules = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/

    return yup.object().shape({
        identifier: yup.string().min(5).required("Identifier is required"),
        fullName: yup.string().min(6).required("Full name is required"),
        email: yup.string().email().required("Email is required"),
        password: yup.string().matches( regularsRules , {message: "Please Enter A Strong Password"}).required(),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Confirm Password Must Be Equal Password").required('Password is required'),
    });
}