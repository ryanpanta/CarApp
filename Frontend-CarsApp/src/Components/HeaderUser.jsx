import React from "react";
import CarApp from "../Assets/CarApp.svg?react";
import { UserRound } from "lucide-react";
import styles from "./HeaderUser.module.css";
import { Link } from "react-router-dom";
function HeaderUser() {
    return (
        <header className={styles.header}>
            <Link>
                <CarApp />
            </Link>

            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link to="/carros/lista">Carros</Link>
                    </li>
                    <li>
                        <Link to="/carros/cadastro">Cadastrar</Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.user}>
                <UserRound size={20} />
                <p>Ryan</p>
            </div>
        </header>
    );
}

export default HeaderUser;
