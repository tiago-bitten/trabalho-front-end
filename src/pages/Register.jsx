import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useFormFields } from '../hooks/useFormFields';
import { createUser } from '../services/userService';
import '../styles/Register.css';

const EMPTY_REGISTRATION_FORM = {
    name: '',
    cpf: '',
    birthday: '',
    email: '',
    password: '',
};

const REGISTRATION_SUCCESS_MESSAGE = 'Conta criada com sucesso!';

const Register = () => {
    const [registrationData, handleFieldChange] = useFormFields(EMPTY_REGISTRATION_FORM);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await createUser(registrationData);
            alert(REGISTRATION_SUCCESS_MESSAGE);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="register-section">
            <div className="register-container">
                <h1>Se cadastre</h1>
                <form onSubmit={handleSubmit}>
                    <Input type="text" name="name" placeholder="Nome" onChange={handleFieldChange} />
                    <Input type="text" name="cpf" placeholder="CPF" onChange={handleFieldChange} />
                    <Input type="date" name="birthday" placeholder="Data de Nascimento" onChange={handleFieldChange} />
                    <Input type="email" name="email" placeholder="Email" onChange={handleFieldChange} />
                    <Input type="password" name="password" placeholder="Senha" onChange={handleFieldChange} />
                    <Button type="submit">Cadastrar</Button>
                </form>
            </div>
        </div>
    );
};

export default Register;
