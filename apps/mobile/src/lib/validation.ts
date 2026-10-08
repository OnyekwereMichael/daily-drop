import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});


export const signupValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Please confirm your password'),
    role: Yup.string().oneOf(['USER', 'STOREOWNER', 'DRIVER']).required('Role is required'),
});