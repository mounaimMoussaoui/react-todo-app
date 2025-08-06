import * as yup from 'yup';

const regularExp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
export const schemaLoginSchema = yup.object().shape({
    identifier: yup.string().min(5).required('Identification is required'),
    password: yup.string().matches(regularExp, {message: 'Please Enter A Strong Password'}).required('Password is required'),
});