import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "./LoginForm.module.css";
import Button from "../Form/Button";
function LoginForm() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function handleSubmit(event){
        event.preventDefault()
        const response = await fetch('https://localhost:7017/api/User/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({email, password})
        })
        console.log(response);
        const data = await response.json();
        console.log(data);
    }
    return (
        <div className={styles.login}>
            <h2>Log in</h2>
            <p>Digite o seu e-mail e senha para entrar.</p>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    size=""
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                />
                <TextField
                    id="outlined-basic"
                    label="Senha"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
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
