import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import {ProjectCard} from './ProjectCard';
import './MainPage.css';
import {getCards} from './Client.js'

const filterCategories = {
    skills: {
        title: "Навыки",
        filters: [
            {name: "Backend-разработчик", label: "Backend-разработчик"},
            {name: "Frontend-разработчик", label: "Frontend-разработчик"},
            {name: "Аналитик", label: "Аналитик"},
            {name: "Дизайнер", label: "Дизайнер"},
            {name: "ML-инженер", label: "ML-инженер"},
            {name: "Тестировщик", label: "Тестировщик"},
            {name: "Менеджер", label: "Менеджер"},
            {name: "Другое", label: "Другое"}
        ]
    },
    course: {
        title: "Курс",
        filters: [
            {name: "first", label: "1"},
            {name: "second", label: "2"},
            {name: "third", label: "3"},
            {name: "fourth", label: "4"}
        ]
    },
    type: {
        title: "Тип",
        filters: [
            {name: "study", label: "Учебный"},
            {name: "pet", label: "Пет-проект"},
            {name: "customer", label: "Есть заказчик"}
        ]
    }
};


const FilterCheckbox = ({name, label, checked, onChange}) => (
    <label className={`filter-${name}`}>
        <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
        />
        {label}
    </label>
);

const FilterGroup = ({title, filters, filterState, onFilterChange, groupClassName}) => (
    <div className={groupClassName}>
        <h3 className={title.toLowerCase()}>{title}</h3>
        {filters.map(({name, label}) => (
            <FilterCheckbox
                key={name}
                name={name}
                label={label}
                checked={filterState[name]}
                onChange={onFilterChange}
            />
        ))}
    </div>
);


export function MainPage() {
    console.log('MainPage rendered');
    const navigate = useNavigate()

    const initialFilters = Object.values(filterCategories)
        .flatMap(category => category.filters)
        .reduce((acc, {name}) => ({...acc, [name]: false}), {});

    const [filters, setFilters] = useState(initialFilters);
    const [projects, setProjects] = useState([]);

    const formatProjects = (cardsData) => {
        return cardsData ? cardsData.map((card, index) => {
            console.log('teammates при открытии главной страницы', card.teammates);
            return {
                id: index + 1,
                username: card.title || "Неизвестный",
                description: card.description || "Нет описания",
                search_skills: card.who_needs.map(reader => reader.skill) || ["Навык не указан"],
                type: card.type === "pet"? "Пет-проект" : "Учебный",
                course: Array.from(new Set(card.who_needs.map(member => member.grade).filter(Boolean))) || [1],
                customer: card.customer || false,
                telegram_id: card.telegram_id,
                team: card.teammates.map(member => ({
                    name: member.name,
                    skill: member.skill
                })) || []
            };
        }) : [];
    };

    useEffect(() => {
        const fetchInitialProjects = async () => {
            try {
                const cardsData = await getCards();
                const formattedProjects = formatProjects(cardsData);
                setProjects(formattedProjects);
            } catch (error) {
                console.error('Ошибка получения карточек:', error);
            }
        };

        const sendView = async () => {
            try {
                const response = await fetch('/api/metrics/view', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Успешный ответ сервера:', data);
                } else {
                    console.error('Ошибка при отправке запроса:', response.status);
                }
            } catch (error) {
                console.error('Сетевая ошибка:', error);
            }
        };

        fetchInitialProjects();
        sendView();
    }, []);

    const handleFilterChange = (event) => {
        const {name, checked} = event.target;
        setFilters(prev => ({...prev, [name]: checked}));
    };


    const applyFilters = async () => {
        const selectedSkills = Object.keys(filters)
            .filter(key => filters[key] && filterCategories.skills.filters.some(f => f.name === key));
        const selectedCourses = Object.keys(filters)
            .filter(key => filters[key] && filterCategories.course.filters.some(f => f.name === key))
            .map(key => parseInt(key.replace('first', '1').replace('second', '2')
                .replace('third', '3').replace('fourth', '4')));
        const selectedTypes = Object.keys(filters)
            .filter(key => filters[key] && filterCategories.type.filters.some(f => f.name === key
                && f.name !== 'customer'));
        const hasCustomer = filters['customer'] || false;
        try {
            const queryParams = new URLSearchParams();
            if (selectedSkills.length > 0) {
                selectedSkills.forEach(skill => queryParams.append('skills', skill));
            }
            if (selectedCourses.length > 0) {
                selectedCourses.forEach(course => queryParams.append('courses', course));
            }
            if (selectedTypes.length > 0) {
                selectedTypes.forEach(type => queryParams.append('type', type));
            }

            if (hasCustomer) {
                queryParams.set('customer', 'true');
            }

            const response = await fetch(`/api/cards/filter?${queryParams}`);
            const data = await response.json();
            const formattedProjects = formatProjects(data);
            setProjects(formattedProjects);
        } catch (error) {
            console.error('Ошибка при отправке фильтров:', error);
        }
    };

    return (
        <div className="main-container">
            <header className="header">
                <h1 className="site-title" onClick={() => navigate('/')}>ProjectHub</h1>
                <img
                    src="src/assets/user.png"
                    alt="User Icon"
                    className="user-icon"
                    onClick={() => navigate('/User')}
                />
            </header>

            <div className="sidebar">
                {Object.entries(filterCategories).map(([key, {title, filters: filterItems}]) => (
                    <FilterGroup
                    key={key}
                    title={title}
                    filters={filterItems.map(item => ({
                        ...item,
                        label: <span className="filter-text">{item.label}</span>
                    }))}
                    filterState={filters}
                    onFilterChange={handleFilterChange}
                    groupClassName={key === 'course' ? 'course-group' : 'group'}
                    />
                ))}
                <button className="apply-filters-button" onClick={applyFilters}>
                    Применить фильтры
                </button>
            </div>

            <img
                src="src/assets/edit.png"
                alt="Edit"
                className="edit-icon"
                onClick={() => navigate('/Create')}
            />

            <div className="projects-grid">
                {projects.length === 0 ? (
                    <div className="empty-projects-message">
                        Не нашлось ничего подходящего
                    </div>
                ) : (
                    projects.map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))
                )}
            </div>
        </div>
    );
}