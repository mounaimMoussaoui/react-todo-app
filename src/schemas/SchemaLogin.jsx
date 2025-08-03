import * as yup from 'yup';


export const schemaLoginSchema = yup.object().shape({
    identifier: yup.string().min(5).required('Identification is required'),
    password: yup.string().matches(/[a-zA-Z]+/, {message: 'Please Enter A Strong Password'}).required('Password is required'),
});