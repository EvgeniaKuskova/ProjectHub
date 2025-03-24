import React from 'react';
import './App.css'
import './Registration.css'
import {Link} from "react-router-dom";


export function RegistrationPage() {
    const handleLogin = () => {
        alert("Кнопка ввода нажата!");
    };

    return (
        <>
            <div className="container">
                <h1 className="registrationHeader">ProjectHub</h1>
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
                    <button className="button" onClick={handleLogin}>
                        Зарегистрироваться
                    </button>
                    <Link className="link" to="/">Есть аккаунт? Войти</Link>
                </div>
            </div>
        </>
    );
}