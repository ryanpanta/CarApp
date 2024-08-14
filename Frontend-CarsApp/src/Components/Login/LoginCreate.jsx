import React from "react";
import styles from "./LoginCreate.module.css";
import TextField from "@mui/material/TextField";
import Button from "../Form/Button";
import {Link} from "react-router-dom";
import useForm from "../../Hooks/useForm";
function LoginCreate() {
    const nome = useForm("");
    const email = useForm("email");
    const senha = useForm("senha");

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await fetch("https://localhost:7017/api/User", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ nome, email, senha }),
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
    }

    return (
        <div className={`animeLeft ${styles.cadastro}`}>
            <h2>Cadastre-se</h2>
            <p style={{marginBottom: '20px'}}>Digite o seu e-mail e senha para cadastrar.</p>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="outlined-basic"
                    label="Nome"
                    error={nome.error}
                    helperText={nome.error}
                    variant="outlined"
                    type="text"
                    value={nome}
                    {...nome}
                />
                <TextField
                    id="outlined-basic"
                    label="Email"
                    error={email.error}
                    helperText={email.error}
                    variant="outlined"
                    type="email"
                    value={email}
                    {...email}
                />
                <TextField
                    id="outlined-basic"
                    label="Senha"
                    error={senha.error}
                    helperText={senha.error}
                    variant="outlined"
                    type="password"
                    value={senha}
                    {...senha}
                />
                <Button text="Cadastrar" variant="primary" />
            </form>
            <div className={styles.separation}>
                <span className={styles.line} />
                <span>ou</span>
                <span className={styles.line} />
            </div>
            <Link to={"/login"}><Button text="Fazer login" variant="secondary" /></Link>
        </div>
    );
}

export default LoginCreate;
