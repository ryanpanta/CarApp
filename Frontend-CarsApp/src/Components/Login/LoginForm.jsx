import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "./LoginForm.module.css";
import Button from "../Form/Button";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Helper/Loading";
import { Navigate } from "react-router-dom";
import UserContext from "../../UserContext";
function LoginForm({ setLoading }) {

    const { userLogin } = React.useContext(UserContext);


    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        await userLogin(email, password);
        
    }
    return (
        <div className={`animeLeft ${styles.login}`}>
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
