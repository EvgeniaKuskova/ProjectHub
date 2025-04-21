import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './PageCreateAdvertisement.css';
import {createCard, getMe} from './Client.js'
import userImage from "./assets/user.png";

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
    const navigate = useNavigate()

    const initialFilters = Object.values(filterCategories)
        .flatMap(category => category.filters)
        .reduce((acc, {name}) => ({...acc, [name]: false}), {});

    const [filters, setFilters] = useState(initialFilters);
    const [otherSkill, setOtherSkill] = useState('');
    const [description, setDescription] = useState('');
    const [team, setTeam] = useState([]);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [newMemberName, setNewMemberName] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);

    const availableRoles = [
        "Backend-разработчик",
        "Frontend-разработчик",
        "Дизайнер",
        "Аналитик",
        "Тестировщик",
        "Менеджер",
        "Другое"
    ];

    const handleFilterChange = (event) => {
        const { name, checked } = event.target;
        if (name === "study" || name === "pet") {
            setFilters(prev => ({
                ...prev,
                study: false,
                pet: false
            }));

            if (checked) {
                setFilters(prev => ({
                    ...prev,
                    [name]: true
                }));
            }
        } else {
            setFilters(prev => ({ ...prev, [name]: checked }));
        }

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

    const handleAddTeamMemberClick = () => {
        setShowAddMemberModal(true);
    };

    const handleRoleChange = (role) => {
        console.log('Role changed:', role, 'Current selectedRoles:', selectedRoles);
        setSelectedRoles(prev => 
            prev.includes(role) 
                ? prev.filter(r => r !== role) 
                : [...prev, role]
        );
    };

    const handleAddMemberSubmit = () => {
        console.log('Selected roles before submit:', selectedRoles);
        if (newMemberName.trim() && selectedRoles.length > 0) {
            const newMember = {
                name: newMemberName,
                skill: selectedRoles.join(', ')
            };
            console.log('New member being added:', newMember);
            setTeam([...team, newMember]);
            setNewMemberName('');
            setSelectedRoles([]);
            setShowAddMemberModal(false);
        }
    };

    const handleCancelAddMember = () => {
        setNewMemberName('');
        setSelectedRoles([]);
        setShowAddMemberModal(false);
    };

    const handlePublish = async () => {
        const selectedSkills = filterCategories.skills.filters
            .filter(({name}) => filters[name])
            .map(({label}) => label);
    
        if (otherSkill.trim() !== '') {
            selectedSkills.push(otherSkill);
        }
    
        const selectedCourses = filterCategories.course.filters
            .filter(({name}) => filters[name])
            .map(({label}) => parseInt(label));
    
        const hasCustomer = filters.customer;
    
        const formattedWhoNeeds = selectedSkills.map(skill => ({
            grade: selectedCourses.join(', ') , 
            skill: skill
        }));

        const selectedType = filterCategories.type.filters
            .filter(({name}) => name !== 'customer' && filters[name])
            .map(({name}) => name)[0];

        let myAllName;
        try {
            const me = await getMe();
            myAllName = me.name + " " + me.surname;
        } catch (error) {
            console.error('Ошибка получения пользователя:', error);
        }
    
        const cardData = {
            title: myAllName,
            description: description,
            teammates: team.map(member => ({
                name: member.name,
                skill: member.skill
            })),
            who_needs: formattedWhoNeeds,
            tech_stack: selectedSkills.join(', '),
            customer: hasCustomer,
            telegram_id: localStorage.getItem("tg"),
            type: selectedType
        };
    
        console.log('Отправляемые данные:', cardData); 
        console.log('Original team data:', team);
    
        try {
            const success = await createCard(cardData); 
            
            if (success) {
                alert('Объявление успешно опубликовано!');
                setDescription('');
                setTeam([]);
                setFilters(initialFilters);
                setOtherSkill('');
            }
        } catch (error) {
            console.error('Ошибка при публикации:', error);
            alert('Не удалось опубликовать объявление');
        }
    };

    const isFormValid = () => {
        const isDescriptionValid = description.trim() !== '';
        const isTeamValid = team.length > 0;
        const isCourseValid = filterCategories.course.filters
            .some(({name}) => filters[name]);
        const isTypeValid = filterCategories.type.filters
            .some(({name}) => name !== 'customer' && filters[name]);
        const isRolesValid = filterCategories.skills.filters
            .some(({name}) => filters[name]);
        
        return isDescriptionValid && isTeamValid && isCourseValid && isTypeValid && isRolesValid;
    };

    return (
        <div className="main-container">
            <header className="header">
                <h1 className="site-title">ProjectHub</h1>
                <img
                    src={userImage}
                    alt="User Icon"
                    className="user-icon"
                    onClick={() => navigate('/User')}
                />
            </header>
            <div className="container-choose">
                <div className="description">
                    <h1>Описание</h1>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
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
                    <button 
                        className="addPeople" 
                        type="button" 
                        onClick={handleAddTeamMemberClick}>+ Добавить человека
                    </button>
                    {team.length > 0 && (
                        <div className="team-list">
                            {team.map((member, index) => (
                                <div key={index} className="add-team">
                                    {member.name} - {member.skill}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <button 
                className="AddAdvertisement" 
                type="button" 
                onClick={handlePublish}
                disabled={!isFormValid()}>
                Опубликовать
            </button>

            {/* Модальное окно добавления участника */}
            {showAddMemberModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Добавить участника</h2>
                        <div className="form-group">
                            <label>Имя:</label>
                            <input
                                type="text"
                                value={newMemberName}
                                onChange={(e) => setNewMemberName(e.target.value)}
                                placeholder="Введите имя участника"
                            />
                        </div>
                        <div className="form-group">
                            <label>Роли:</label>
                            <div className="roles-checkbox-group">
                                {availableRoles.map(role => (
                                    <label key={role} className="role-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={selectedRoles.includes(role)}
                                            onChange={() => handleRoleChange(role)}
                                        />
                                        {role}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="modal-buttons">
                            <button onClick={handleCancelAddMember}>Отмена</button>
                            <button 
                                onClick={handleAddMemberSubmit}
                                disabled={!newMemberName.trim() || selectedRoles.length === 0}
                            >
                                Добавить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}