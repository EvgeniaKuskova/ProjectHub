import React, {useState} from 'react';
import './App.css';
import './PageCreateAdvertisement.css'

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
        <h1 className={title.toLowerCase()}>{title}</h1>
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

export function CreatePage() {
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
                    onClick={() => console.log('Icon clicked')}
                />
            </header>
            <div className="container-choose">
                <div className="description">
                    <h1>Описание</h1>
                    <textarea></textarea>
                </div>
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
                        groupClassName={key}
                        />
                    ))}
                    <div className="addCommand">
                        <h1>Команда</h1>
                        <button className="addPeople" onClick={() => console.log('Add person clicked')}>
                            + Добавить человека
                        </button>
                    </div>
            </div>
            <button className="AddAdvertisement">Опубликовать</button>
        </div>
    );
}