import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import {ProjectCard} from './ProjectCard';
import './MainPage.css';
import {getCards} from './Client.js'

const filterCategories = {
    skills: {
        title: "Навыки",
        filters: [
            {name: "backend", label: "Backend-разработчик"},
            {name: "frontend", label: "Frontend-разработчик"},
            {name: "analyst", label: "Аналитик"},
            {name: "designer", label: "Дизайнер"},
            {name: "ml", label: "ML-инженер"},
            {name: "qa", label: "Тестировщик"},
            {name: "manager", label: "Менеджер"},
            {name: "other", label: "Другое"}
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
            {name: "educational", label: "Учебный"},
            {name: "personal", label: "Пет-проект"},
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

let mockProjects = [];
try {
    const cardsData = await getCards(); 
    mockProjects = cardsData ? cardsData.map((card, index) => ({
        id: index + 1,
        username: card.teammates[0]?.name || "Неизвестный",
        description: card.description || "Нет описания",
        search_skills: card.who_needs.map(reader => reader.skill) || ["Навык не указан"],
        type: card.customer ? "Коммерческий" : "Учебный", 
        course: card.teammates.map(member => member.grade).filter(Boolean) || [1], 
        customer: card.customer || false,
        team: card.teammates.map(member => ({
            name: member.name,
            skills: [member.skill]
        })) || []
    })) : [];
} catch (error) {
    console.error('Ошибка получения карточек:', error);
    mockProjects = [];
}

export function MainPage() {
    const navigate = useNavigate()

    const initialFilters = Object.values(filterCategories)
        .flatMap(category => category.filters)
        .reduce((acc, {name}) => ({...acc, [name]: false}), {});

    const [filters, setFilters] = useState(initialFilters);

    const handleFilterChange = (event) => {
        const {name, checked} = event.target;
        setFilters(prev => ({...prev, [name]: checked}));
    };

    return (
        <div className="main-container">
            <header className="header">
                <h1 className="site-title">ProjectHub</h1>
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
            </div>

            <img
                src="src/assets/edit.png"
                alt="Edit"
                className="edit-icon"
                onClick={() => navigate('/Create')}
            />

            <div className="projects-grid">
                {mockProjects.map(project => (
                    <ProjectCard key={project.id} project={project}/>
                ))}
            </div>
        </div>
    );
}