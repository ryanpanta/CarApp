import React from "react";
import styles from "./LoginCreate.module.css";
import TextField from "@mui/material/TextField";
import Button from "../Form/Button";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import Loading from "../Helper/Loading";
import { toast } from "react-toastify";
import UserContext from "../../UserContext";

function LoginCreate({setLoading}) {
    const nome = useForm("");
    const email = useForm("email");
    const senha = useForm("senha");

    const navigate = useNavigate();

    const { userLogin } = React.useContext(UserContext);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            setLoading(true);
            const userData = {
                nome: nome.value,
                email: email.value,
                senha: senha.value,
            };
            const response = await fetch("https://localhost:7017/api/User", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                toast.success("Cadastro realizado com sucesso!");
                userLogin(email.value, senha.value);
                navigate("/carros/lista");
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`animeLeft ${styles.cadastro}`}>
            {/* {loading && <Loading />} */}
            <h2>Cadastre-se</h2>
            <p style={{ marginBottom: "20px" }}>
                Digite o seu e-mail e senha para cadastrar.
            </p>
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
            <Link to={"/login"}>
                <Button text="Fazer login" variant="secondary" />
            </Link>
        </div>
    );
}

export default LoginCreate;
