import React from 'react';
import styles from './styles.module.css';
import { Field, Formik, useFormikContext } from 'formik';

const SelectDeputy = () => {
    const { handleSubmit } = useFormikContext()

    return (
        <div className={styles.container}>
            <div className={styles.align}>
                <div className={styles.perfil}>
                    <div className={styles.perfil__image}>
                        <div className={styles['perfil__image--content']}>

                        </div>
                    </div>
                    <div className={styles['perfil__description--name']}>
                        <h2>Seu nome</h2>
                        
                    </div>
                    <div className={styles['perfil__description--generalInfo']}>
                        <h2>Profissão, idade, cidade e estado...</h2>
                    </div>
                </div>

                <div className={styles.text}>
                    <h1 className={styles.text__title}>Quem você quer seguir?</h1>
                    <p className={styles.text__paragraph}><strong>Estamos perguntando para você poder acompanhar os gastos dos seus candidatos e poder cobrar.</strong></p>
                    <p className={styles.text__paragraph}><strong>Não se preocupe, iremos proteger essa informação!</strong></p>
                </div>

                <form className={styles.form}>
                    <div className={styles.input}>
                        <label className={styles.input__text}>Seu candidato para deputado estadual 1</label>
                        <Field className={styles.input__field} name="deputyOne" placeholder="Deputado estadual 1"/>
                    </div>

                    <div className={styles.input}>
                        <label className={styles.input__text}>Seu candidato para deputado estadual 2</label>
                        <Field className={styles.input__field} name="deputyTwo" placeholder="Deputado estadual 2"/>
                    </div>

                    <button className={styles.button} type='submit'>Cadastrar</button>
                </form>
                
                

            </div>
        </div>
    )
}

export const SelectDeputyFormik = () => {

    function onSubmit(values) {
        console.log(values);
    }

    return (
        <Formik
            initialValues={{
                
            }}
            onSubmit={onSubmit}
        >
            <SelectDeputy />
        </Formik>

    )
}