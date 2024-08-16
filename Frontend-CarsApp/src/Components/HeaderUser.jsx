import React from "react";
import CarApp from "../Assets/CarApp.svg?react";
import { UserRound, LogOut } from "lucide-react";
import styles from "./HeaderUser.module.css";

import { Link } from "react-router-dom";
import UserContext from "../UserContext";
function HeaderUser() {
    const {userLogout} = React.useContext(UserContext);
    const [logout, setLogout] = React.useState(false);
    const nome = JSON.parse(localStorage.getItem("userData"));
    return (
        <header className={styles.header}>
            <div style={{ width: "150px" }}>
                <Link>
                    <CarApp />
                </Link>
            </div>

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
            <div
                className={styles.user}
                onClick={() => setLogout(!logout)}
                style={{ width: "150px" }}
            >
                {logout && (
                    <div className={styles.logout} onClick={userLogout}>
                            <LogOut size={20} />
                            <p>Sair</p>
                    </div>
                )}
                <UserRound size={20} />
                <p>{nome.dados.nome}</p>
            </div>
        </header>
    );
}

export default HeaderUser;
