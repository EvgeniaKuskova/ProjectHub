import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './LoginAndRegistration.css';
import {loginUser} from './Client.js'
export function LoginPage() {
    const [formData, setFormData] = useState({
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
            const register = await loginUser(
                formData.telegramId,
                formData.password
            );
            if (register === true) {
                navigate('/');
            }
        } catch (error) {
            console.error('Ошибка при входе:', error.message);
        }
    };

    return (
        <>
            <div className="container">
                <h1 className="loginHeader">ProjectHub</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-input-login username"
                        placeholder="Ссылка на telegram"
                        name="telegramId"
                        value={formData.telegramId}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        className="form-input-login password"
                        placeholder="Пароль"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button className="button" type="submit">Войти</button>
                    <Link className="link" to="/Registration">Нет аккаунта? Зарегистрироваться</Link>
                </form>
            </div>
        </>
    );
}