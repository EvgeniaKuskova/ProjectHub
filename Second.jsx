import React from 'react';

export function Second() {
    const handleLogin = () => {
        alert("Кнопка ввода нажата!");
    };

    return (
        <>
            <div className="container">
                <h1 className="header">ProjectHub</h1>
                <div className="form">
                    <input
                        type="name"
                        id="username"
                        placeholder="Имя"
                    />
                    <input
                        type="surname"
                        id="surname"
                        placeholder="Фамилия"
                    />
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
                    <button className="login-button" onClick={handleLogin}>
                        Зарегистрироваться
                    </button>
                </div>
            </div>
            <div className="stripe"></div>
        </>
    );
}