import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Header.css';

const Header = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/">Logo</Link>
                </div>
                <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                    <ul>
                        {!isAuthenticated ? (
                            <>
                                <li><Link to="/login">Entrar</Link></li>
                                <li><Link to="/register">Criar Conta</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/products">Produtos</Link></li>
                                <li><Link to="/categories">Categorias</Link></li>
                                <li><Link to="/sales">Vendas</Link></li>
                                <li><button onClick={handleLogout}>Sair</button></li>
                            </>
                        )}
                    </ul>
                </nav>
                <div className="menu-toggle" onClick={toggleMenu}>
                    &#9776;
                </div>
            </div>
        </header>
    );
};

export default Header;
