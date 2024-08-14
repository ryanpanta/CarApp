import "./App.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/Helper/ProtectedRoute";
import Cadastro from "./Components/Cadastro";
import Home from "./Components/Home";
import List from "./Components/Car/List";
function App() {
    return (
        <div className="App">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login/*" element={<Login />} /> 
                <Route path="/carros/lista" element={<List />} />
              </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
