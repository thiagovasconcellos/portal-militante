import React from 'react';
import PortalLogoMini from "../../../assets/portal-logo-mini.svg";
import { Field, Formik, useFormikContext } from 'formik';
import { InputFormik } from '../../input-formik/InputFormik';
import { Button } from '../../button/Button';

import styles from './styles.module.css';


export const LoginContainer = () => {
    const { handleSubmit } = useFormikContext()

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={PortalLogoMini} alt="" />
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formAlign}>
                    <InputFormik 
                        type="email"
                        name="email" 
                        placeholder="Seu email"
                    />
                    <InputFormik 
                        type="password" 
                        name="password" 
                        placeholder="Sua senha"
                    />
                    <div className={styles.checkbox}>
                        <input 
                            type="checkbox" 
                            className={styles.checkboxInput} 
                        /> 
                        <span>Lembrar de mim</span>
                    </div>
                </div>

                <Button  
                    type='submit'
                    text='Entrar'
                />

                <span 
                    className={styles.subscribePhrase} 
                >
                    Ainda não acompanha seus candidatos? <strong>Cadastrar</strong>
                </span>

            </form>
        </div>
    )
}

export const LoginContainerFormik = () => {

    function onSubmit(values) {
        console.log(values);
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={onSubmit}
        >
            <LoginContainer />
        </Formik>

    )
}