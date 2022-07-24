import "./App.css";
import LoginForm from "./components/LoginForm";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import Navbar from "./components/common/Navbar";

function App() {
    return (
        <div className="w-100 h-100">
            <main className="container mt-5">
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />

                        <Route path="/" element={<Navigate replace to="/login" />} />
                    </Routes>
                </BrowserRouter>
            </main>
        </div>
    );
}

export default App;
