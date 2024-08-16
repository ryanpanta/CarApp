import React from "react";
import styles from "./Login.module.css";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import Loading from "../Helper/Loading";
import { Navigate } from "react-router-dom";
import UserContext from "../../UserContext";

function Login() {

    const cookieExists = document.cookie.split(';').some((item) => item.trim().startsWith('.AspNetCore.Session='));
    if(cookieExists) return <Navigate to="/carros/lista" />

    const {loadingData} = React.useContext(UserContext);
    
    const [loading, setLoading] = React.useState(false);

    return (
        <section className={styles.section}>
            {(loading || loadingData) && <Loading />}
            <div className={styles.container}>
                <Routes>
                    <Route path="/" element={<LoginForm setLoading={setLoading} />} />
                    <Route path="/cadastro" element={<LoginCreate setLoading={setLoading}/>} />
                </Routes>
            </div>
        </section>
    );
}

export default Login;
