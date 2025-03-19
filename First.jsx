import React from 'react'; 
import { Link } from 'react-router-dom';

export function First() {
    const handleLogin = () => {
        alert("Кнопка ввода нажата!");
    };

    return (
        <>
            <div className="container">
                <h1 className="header">ProjectHub</h1>
                <div className="form">
                    <input
                        type="text"
                        id="username"
                        placeholder="Ссылка на telegram"
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Пароль"
                    />
                    <button className="login-button" onClick={handleLogin}>Войти</button>
                    <Link to="/Second">Нет аккаунта? Зарегистрироваться</Link>         
                </div>
            </div>
            <div className="stripe"></div>
        </>
    );
}