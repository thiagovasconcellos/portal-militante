import React from "react";
import styles from "./styles.module.css";
import PortalLogo from "../../assets/portal-logo.svg";
import { LoginContainer, LoginContainerFormik } from "./login-container/LoginContainer";
import { SelectDeputyFormik } from "./select-deputy/SelectDeputy";

export const HomeContainer = () => {
  return (
    <div className={styles.container}>
    <div className={styles.align}>
      <div className={styles.logo}>
        <img
          src={PortalLogo}
          alt="Logo do portal militante, com a descrição Portal Militante - São Paulo"
        />
      </div>
      <div className={styles.form}>
          <LoginContainerFormik />
      </div>
    </div>
    </div>
  );
};
