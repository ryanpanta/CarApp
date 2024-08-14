import React from "react";
import Header from "./Header";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import Button from "./Form/Button";
function Home() {
    return (
        <section className={styles.home}>
            <Header />
            <div className={styles.content}>
                <h1>
                    Seu sistema de carros <span>simplificado</span>
                </h1>
                <p>
                    Explore nossa plataforma de gerenciamento de carros e
                    simplifique seu trabalho
                </p>
                <Link to={"/login/cadastro"}>
                    <Button text="Quero conhecer" variant="primary" />
                </Link>
            </div>
        </section>
    );
}

export default Home;
