import "./App.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./Components/Login/Login";
import ProtectedRoute from "./Components/Helper/ProtectedRoute";
import Cadastro from "./Components/Cadastro";
function App() {
    return (
        <div className="App">
            <BrowserRouter>
              <Routes>
                <Route path="/login/*" element={<Login />} /> 
                <Route path="cadastro" element={<ProtectedRoute><Cadastro/></ProtectedRoute>} />
              </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
