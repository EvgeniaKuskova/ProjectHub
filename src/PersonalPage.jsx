import './App.css';
import React from "react";
import {useNavigate} from 'react-router-dom';
import {ProjectCard} from './ProjectCard';
import './PersonalPage.css'
import {getMyCards} from './Client.js'

let mockProjects = [];
let name = "Неизвестный"; 
let tg = "Не указан"; 

try {
    const cardsData = await getMyCards(); 
    if (cardsData && cardsData.length > 0) {
        const firstCard = cardsData[0];
        name = firstCard.teammates && firstCard.teammates.length > 0 
            ? firstCard.teammates[0].name 
            : "Неизвестный";
        tg = firstCard.telegram_id || "Не указан";
        
        mockProjects = cardsData.map((card, index) => ({
            id: index + 1,
            username: card.title || "Неизвестный",
            description: card.description || "Нет описания",
            search_skills: card.who_needs.map(reader => reader.skill) || ["Навык не указан"],
            type: card.customer ? "Коммерческий" : "Учебный", 
            course: card.who_needs.map(member => member.grade).filter(Boolean) || [1], 
            customer: card.customer || false,
            telegram_id: card.telegram_id,
            team: card.teammates.map(member => ({
                name: member.name,
                skills: [member.skill]
            })) || []
        }));
    }
} catch (error) {
    console.error('Ошибка получения карточек:', error);
    mockProjects = [];
}

const User = {
    name: name,
    telegram: tg,
    projects: mockProjects
};

export function PersonalPage() {

    const navigate = useNavigate();

    return (
        <div className="personal-container">
            <header className="header">
                <h1 className="site-title">ProjectHub</h1>
                <img
                    src="src/assets/home.png"
                    alt="Home Icon"
                    className="home-icon"
                    onClick={() => navigate('/')}
                />
            </header>

            <div className="profile-container">
                <img
                    src="src/assets/default-user.png"
                    alt="User Profile"
                    className="profile-icon"
                />
                <p className="user-name">{User.name}</p>
                <p className="user-telegram">{User.tg}</p>
            </div>

            <div className="projects-container">
                <p className="my-projects">Мои объявления</p>

                <div className="personal-projects-grid">
                    {User.projects.map(project => (
                        <ProjectCard key={project.id} project={project} withDelete={true}/>
                    ))}
                </div>
            </div>

        </div>
    )
}