import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { AuthContext } from '../contexts/AuthContext';
import { useFormFields } from '../hooks/useFormFields';
import { findUserByCredentials } from '../services/userService';
import '../styles/Login.css';

const HOME_ROUTE = '/products';
const INVALID_CREDENTIALS_MESSAGE = 'E-mail ou senha estão incorretos';

const Login = () => {
    const [credentials, handleFieldChange] = useFormFields({ email: '', password: '' });
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const user = await findUserByCredentials(credentials.email, credentials.password);

            if (!user) {
                alert(INVALID_CREDENTIALS_MESSAGE);
                return;
            }

            login(user.id);
            navigate(HOME_ROUTE);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input type="email" name="email" placeholder="Email" onChange={handleFieldChange} />
                <Input type="password" name="password" placeholder="Senha" onChange={handleFieldChange} />
                <Button type="submit">Entrar</Button>
            </form>
        </div>
    );
};

export default Login;
