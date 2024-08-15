import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "./LoginForm.module.css";
import Button from "../Form/Button";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Helper/Loading";
function LoginForm() {
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(
                "https://localhost:7017/api/User/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ email, password }),
                }
            );
            if (response.ok) navigate("/carros/lista");
        } catch (error) {
            console.error("Erro ao fazer o login", error);
        } finally {
            setLoading(false);
        }
        const data = await response.json();
        console.log(data);
    }
    return (
        <div className={`animeLeft ${styles.login}`}>
            {loading && <Loading />}
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
            <Link to={"./cadastro"}>
                <Button text="Fazer cadastro" variant="secondary" />
            </Link>
        </div>
    );
}

export default LoginForm;
