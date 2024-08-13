import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "./LoginForm.module.css";
import Button from "../Form/Button";
function LoginForm() {
    return (
        <div className={styles.login}>
            <h2>Log in</h2>
            <p>Digite o seu e-mail e senha para entrar.</p>
            <form>
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    size=""
                />
                <TextField
                    id="outlined-basic"
                    label="Senha"
                    variant="outlined"
                    type="password"
                />
                <Button text="Login" variant="primary" />
            </form>
            <div className={styles.separation}>
                <span className={styles.line} />
                <span>ou</span>
                <span className={styles.line} />
            </div>
            <Button text="Fazer cadastro" variant="secondary" />
        </div>
    );
}

export default LoginForm;
