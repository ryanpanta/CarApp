import "./App.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/Helper/ProtectedRoute";
import Home from "./Components/Home";
import List from "./Components/Car/List";
import Register from "./Components/Car/Register";
function App() {
    return (
        <div className="App">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login/*" element={<Login />} /> 
                <Route path="/carros/lista" element={<List />} />
                <Route path="/carros/cadastro" element={<Register />} />
              </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
