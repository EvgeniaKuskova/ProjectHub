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
            {name: "other", label: "Другое", isInput: true}
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

const FilterGroup = ({title, filters, filterState, onFilterChange, groupClassName, otherSkill, onOtherSkillChange}) => (
    <div className={groupClassName}>
        <h1 className={title.toLowerCase()}>{title}</h1>
        {filters.map(({name, label}) => {
            if (name === 'other') {
                return (
                    <div key={name} className="other-container">
                        <label className={`filter-${name}`}>
                            <input
                                type="checkbox"
                                name={name}
                                checked={filterState[name]}
                                onChange={(e) => {
                                    onFilterChange(e);
                                    if (!e.target.checked) {
                                        onOtherSkillChange({target: {value: ''}});
                                    }
                                }}
                            />
                            <span className="filter-text">{label}</span>
                        </label>
                        {filterState[name] && (
                            <div className="other-input-container">
                                <input
                                    type="text"
                                    value={otherSkill}
                                    onChange={(e) => {
                                        onOtherSkillChange(e);
                                        if (e.target.value.trim() !== '' && !filterState[name]) {
                                            onFilterChange({target: {name, checked: true}});
                                        }
                                    }}
                                    placeholder="Укажите ваш навык"
                                    className="other-input"
                                />
                            </div>
                        )}
                    </div>
                );
            }
            return (
                <FilterCheckbox
                    key={name}
                    name={name}
                    label={label}
                    checked={filterState[name]}
                    onChange={onFilterChange}
                />
            );
        })}
    </div>
);

export function CreatePage() {
    const initialFilters = Object.values(filterCategories)
            .flatMap(category => category.filters)
            .reduce((acc, {name}) => ({...acc, [name]: false}), {});
    
        const [filters, setFilters] = useState(initialFilters);
        const [otherSkill, setOtherSkill] = useState('');
    
        const handleFilterChange = (event) => {
            const {name, checked} = event.target;
            setFilters(prev => ({...prev, [name]: checked}));
            if (name === 'other' && !checked) {
                setOtherSkill('');
            }
        };
        
        const handleOtherSkillChange = (event) => {
            const value = event.target.value;
            setOtherSkill(value);
            setFilters(prev => ({
                ...prev,
                other: value.trim() !== ''
            }));
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
                        otherSkill={key === 'skills' ? otherSkill : ''}
                        onOtherSkillChange={key === 'skills' ? handleOtherSkillChange : () => {}}
                    />
                ))}
                <div className="addCommand">
                    <h1>Команда</h1>
                    <button className="addPeople" type="button" onClick={() => console.log('Add person clicked')}>
                        + Добавить человека
                    </button>
                </div>
            </div>
            <button className="AddAdvertisement">Опубликовать</button>
        </div>
    );
}