import React from "react";
import { useNavigate } from "react-router-dom";
export const UserContext = React.createContext();

export function UserStorage({ children }) {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const userLogout = React.useCallback(() => {
        setData(null);
        setLoading(false);
        localStorage.removeItem("userData"); 
        document.cookie = ".AspNetCore.Session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        navigate("/");
    }, []);

    async function userLogin(email, password) {
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
            if (response.ok) {
                const json = await response.json();
                setData(json);
                localStorage.setItem("userData", JSON.stringify(json));
                navigate("/carros/lista");
            }
        } catch (error) {
            console.error("Erro ao fazer o login", error);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            setData(JSON.parse(storedUserData)); 
        }
    }, []);

    return (
        <UserContext.Provider value={{ userLogin, data, loading, userLogout }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;
