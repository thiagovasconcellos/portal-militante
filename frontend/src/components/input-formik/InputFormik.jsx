import React from 'react';
import { Field } from 'formik';
import styles from './styles.module.css';


export const InputFormik = ({
    name,
    placeholder,
    type = 'text'
}) => {
    return <>
        <Field
            className={styles.input}
            name={name}
            placeholder={placeholder}
            type={type}
        />
    </>
}