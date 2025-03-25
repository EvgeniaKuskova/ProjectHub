import React from 'react';
import './App.css'
import {Link} from "react-router-dom";


export function RegistrationPage() {
    const handleLogin = () => {
        console.log("Кнопка ввода нажата!");
    };

    return (
        <>
            <div className="container">
                <h1 className="registrationHeader">ProjectHub</h1>
                <form className="form">
                    <input
                        type="text"
                        className="form-input-registration username"
                        placeholder="Имя"
                    />
                    <input
                        type="text"
                        className="form-input-registration surname"
                        placeholder="Фамилия"
                    />
                    <input
                        type="text"
                        className="form-input-registration tg"
                        placeholder="Ссылка на telegram"
                    />
                    <input
                        type="password"
                        className="form-input-registration password"
                        placeholder="Пароль"
                    />
                    <button className="button" type="button" onClick={handleLogin}>
                        Зарегистрироваться
                    </button>
                    <Link className="link" to="/Login">Есть аккаунт? Войти</Link>
                </form>
            </div>
        </>
    );
}