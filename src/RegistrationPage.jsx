import React from 'react';
import './App.css'

export function RegistrationPage() {
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
                        placeholder="Имя"
                    />
                    <input
                        type="text"
                        id="surname"
                        placeholder="Фамилия"
                    />
                    <input
                        type="text"
                        id="tg"
                        placeholder="Ссылка на telegram"
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Пароль"
                    />
                    <button className="login-button" onClick={handleLogin}>
                        Зарегистрироваться
                    </button>
                </div>
            </div>
            <div className="stripe"></div>
        </>
    );
}