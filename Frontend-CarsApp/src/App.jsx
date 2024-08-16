import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/Helper/ProtectedRoute";
import Home from "./Components/Home";
import List from "./Components/Car/List";
import Register from "./Components/Car/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserStorage } from "./UserContext";
function App() {
    return (
        <div className="App">
            <ToastContainer />
            <BrowserRouter>
                <UserStorage>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login/*" element={<Login />} />
                        <Route
                            path="/carros/lista"
                            element={
                                <ProtectedRoute>
                                    <List />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/carros/cadastro"
                            element={
                                <ProtectedRoute>
                                    <Register />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </UserStorage>
            </BrowserRouter>
        </div>
    );
}

export default App;
