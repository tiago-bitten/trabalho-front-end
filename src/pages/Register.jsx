import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { v4 as uuidv4 } from 'uuid';
import "../styles/Register.css";

const URL = 'http://localhost:5000';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: uuidv4(),
                name,
                email,
                password
            })
        });

        if (response.ok) {
            alert('Conta criada com sucesso!');
        } else {
            alert('Error');
        }
    };

    return (
        <div className="register-container">
            <h1>Se cadastre</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="name"
                    placeholder="Nome"
                />
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleEmailChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                />
                <Button type="submit">Cadastrar</Button>
            </form>
        </div>
    );
};

export default Register;
