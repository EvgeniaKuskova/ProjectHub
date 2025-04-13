import React, { useState } from 'react';
import './App.css'
import { Link, useNavigate } from 'react-router-dom';
import {registerUser} from './Client.js'

export function RegistrationPage() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        telegramId: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const register = await registerUser(
                formData.name,
                formData.surname,
                formData.telegramId,
                formData.password
            );
            if (register === true) {
                navigate('/Login');
            }
        } catch (error) {
            console.error('Ошибка регистрации:', error.message);
        }
    };

    return (
        <>
            <div className="container">
                <h1 className="registrationHeader">ProjectHub</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-input-registration username"
                        placeholder="Имя"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        className="form-input-registration surname"
                        name="surname"
                        placeholder="Фамилия"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        className="form-input-registration tg"
                        placeholder="Ссылка на telegram"
                        name="telegramId"
                        value={formData.telegramId}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        className="form-input-registration password"
                        placeholder="Пароль"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button className="button" type="submit">
                        Зарегистрироваться
                    </button>
                    <Link className="link" to="/Login">Есть аккаунт? Войти</Link>
                </form>
            </div>
        </>
    );
}