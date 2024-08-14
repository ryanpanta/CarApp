import React from "react";
import CarApp from "../Assets/CarApp.svg?react";
import Button from "./Form/Button";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
function Header() {
    return (
        <header className={styles.header}>
            <CarApp />
            <div className={styles.buttons}>
                <Link to={"/login"} className={styles.login}>
                    <Button text="Login" variant="secondary" />
                </Link>
                <Link to={"/login/cadastro"}>
                    <Button text="Cadastre-se" variant="primary" />
                </Link>
            </div>
        </header>
    );
}

export default Header;
