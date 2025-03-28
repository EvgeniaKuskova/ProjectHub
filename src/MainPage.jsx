import React, {useState} from 'react';
import './App.css'
import './MainPage.css';

export function MainPage() {
    const [filters, setFilters] = useState({
        backend: false,
        frontend: false,
        analyst: false,
        designer: false,
        ml: false,
        qa: false,
        manager: false,
        other: false,
        first: false,
        second: false,
        third: false,
        fourth: false,
        educational: false,
        personal: false,
        customer: false
    });

    // Обработчик изменения состояния чекбокса
    const handleFilterChange = (event) => {
        const {name, checked} = event.target;
        setFilters(prev => ({
            ...prev, [name]: checked
        }));
    };
    return (<>
            <div className="main-container">
                <header className="header">
                    <h1 className="site-title">ProjectHub</h1>
                    <img
                    src="src/assets/user.png"  // Путь к изображению
                    alt="User Icon"         // Альтернативный текст
                    className="user-icon"    // Класс для стилизации
                />
                </header>
                <div className="sidebar">
                <div className="skills-container">
                <h3 className="skills">Навыки</h3>
                    <label className="filter-backend">
                        <input
                            type="checkbox"
                            name="backend"
                            checked={filters.backend}
                            onChange={handleFilterChange}
                        /><span>Backend-разработчик</span>
                    </label>
                    <label className="filter-frontend">
                        <input
                            type="checkbox"
                            name="frontend"
                            checked={filters.frontend}
                            onChange={handleFilterChange}
                        /><span>Frontend-разработчик</span>
                    </label>
                    <label className="filter-analyst">
                        <input
                            type="checkbox"
                            name="analyst"
                            checked={filters.analyst}
                            onChange={handleFilterChange}
                        /><span>Аналитик</span>
                    </label>
                    <label className="filter-designer">
                        <input
                            type="checkbox"
                            name="designer"
                            checked={filters.designer}
                            onChange={handleFilterChange}
                        /><span>Дизайнер</span>
                    </label>
                    <label className="filter-ml">
                        <input
                            type="checkbox"
                            name="ml"
                            checked={filters.ml}
                            onChange={handleFilterChange}
                        /><span>ML-инженер</span>
                    </label>
                    <label className="filter-qa">
                        <input
                            type="checkbox"
                            name="qa"
                            checked={filters.qa}
                            onChange={handleFilterChange}
                        /><span>Тестировщик</span>
                    </label>
                    <label className="filter-manager">
                        <input
                            type="checkbox"
                            name="manager"
                            checked={filters.manager}
                            onChange={handleFilterChange}
                        /><span>Менеджер</span>
                    </label>
                    <label className="filter-other">
                        <input
                            type="checkbox"
                            name="other"
                            checked={filters.other}
                            onChange={handleFilterChange}
                        /><span>Другое</span>
                    </label>
                    </div>
                    <h3 className="course">Курс</h3>
                    <div className="course-container">
                    <label className="filter-first">
                        <input
                            type="checkbox"
                            name="first"
                            checked={filters.first}
                            onChange={handleFilterChange}
                        />1
                    </label>
                    <label className="filter-second">
                        <input
                            type="checkbox"
                            name="second"
                            checked={filters.second}
                            onChange={handleFilterChange}
                        />2
                    </label>
                    <label className="filter-third">
                        <input
                            type="checkbox"
                            name="third"
                            checked={filters.third}
                            onChange={handleFilterChange}
                        />3
                    </label>
                    <label className="filter-fourth">
                        <input
                            type="checkbox"
                            name="fourth"
                            checked={filters.fourth}
                            onChange={handleFilterChange}
                        />4
                    </label>
                    </div>
                    <h3 className="type">Тип</h3>
                    <label className="filter-educational">
                        <input
                            type="checkbox"
                            name="educational"
                            checked={filters.educational}
                            onChange={handleFilterChange}
                        />Учебный
                    </label>
                    <label className="filter-personal">
                        <input
                            type="checkbox"
                            name="personal"
                            checked={filters.personal}
                            onChange={handleFilterChange}
                        />Пет-проект
                    </label>
                    <label className="filter-customer">
                        <input
                            type="checkbox"
                            name="customer"
                            checked={filters.customer}
                            onChange={handleFilterChange}
                        />Есть заказчик
                    </label>
                </div>
            </div>

        </>)
}