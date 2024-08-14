import React from "react";
import styles from "./Login.module.css";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
function Login() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
               
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/cadastro" element={<LoginCreate />} />
                </Routes>
            </div>
        </section>
    );
}

export default Login;
