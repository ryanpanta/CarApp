import "./App.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/Helper/ProtectedRoute";
import Cadastro from "./Components/Cadastro";
import Home from "./Components/Home";
function App() {
    return (
        <div className="App">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login/*" element={<Login />} /> 
                <Route path="cadastro" element={<ProtectedRoute><Cadastro/></ProtectedRoute>} />
              </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
