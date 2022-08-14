import React from 'react';
import styles from './styles.module.css';
import PortalLogoMini from "../../../assets/portal-logo-mini.svg";
import { Formik } from 'formik';

export const LoginContainer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={PortalLogoMini} alt="" />
      </div>
      <form className={styles.form} >
        <div className={styles.formAlign}>
          <input type="email" name="email" placeholder="Seu email" className={styles.input} />
          <input type="senha" name="senha" placeholder="Sua senha" className={styles.input} />
          <div className={styles.checkbox}>
            <input type="checkbox" className={styles.checkboxInput} /> <span>Lembrar de mim</span>
          </div>
        </div>

        <button className={styles.button} >Entrar</button>
        <span className={styles.subscribePhrase} >Ainda não acompanha seus candidatos? <strong>Cadastrar</strong></span>
      </form>
    </div>
  )
}

export const LoginContainerFormik = () => {
  return (
    <Formik
      initialValues={{
        email: '',
        senha: ''
      }}
      onSubmit={values => {
        console.log(values)
      }}
    >
      <LoginContainer />
    </Formik>

  )
}