import React, { useState } from "react";
import Input from "../ui/components/Input";
import Button from "../ui/components/Button";
import { v4 as uuidv4 } from 'uuid'

const URL = 'http://localhost:5000'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(`${URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: uuidv4(),
                email,
                password
            })
        })

        if (response.ok) {
            alert('User created')
        } else {
            alert('Error')
        }
    }

    return (
        <div>
            <h1>Entrar</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="username"
                    placeholder="Email"
                    onChange={handleEmailChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    onChange={handlePasswordChange}
                />
                <Button type="confirm-button">Entrar</Button>
            </form>
        </div>
    )
};

export default Login;