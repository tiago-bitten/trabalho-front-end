import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Input from "../components/Input";
import Button from "../components/Button";
import { AuthContext } from '../contexts/AuthContext';
import "../styles/Login.css";

const URL = 'http://localhost:5000';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${URL}/users?email=${email}&password=${password}`);
        const users = await response.json();

        if (users.length > 0) {
            const user = users[0];
            login(user.id);
            navigate('/products');
        } else {
            alert('E-mail ou senha estão incorretos');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleEmailChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    onChange={handlePasswordChange}
                />
                <Button type="submit">Entrar</Button>
            </form>
        </div>
    );
};

export default Login;
