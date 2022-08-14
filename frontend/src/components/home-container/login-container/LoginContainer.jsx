import React from 'react';
import styles from './styles.module.css';
import PortalLogoMini from "../../../assets/portal-logo-mini.svg";
import { Field, Formik, useFormikContext } from 'formik';

export const LoginContainer = () => {
    const { handleSubmit } = useFormikContext()

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={PortalLogoMini} alt="" />
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formAlign}>
                    <Field 
                        type="email" 
                        name="email" 
                        placeholder="Seu email" 
                        className={styles.input} 
                    />
                    <Field
                        type="password" 
                        name="password" 
                        placeholder="Sua senha" 
                        className={styles.input} 
                    />
                    <div className={styles.checkbox}>
                        <input 
                            type="checkbox" 
                            className={styles.checkboxInput} 
                        /> 
                        <span>Lembrar de mim</span>
                    </div>
                </div>

                <button 
                    className={styles.button} 
                    type="submit" 
                >
                    Entrar
                </button>

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