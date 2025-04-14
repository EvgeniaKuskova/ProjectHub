import './App.css';
import React from "react";
import {useNavigate} from 'react-router-dom';
import {ProjectCard} from './ProjectCard';
import './PersonalPage.css'

const User = {
    name: "Мария Иванова",
    telegram: "@example",
    projects: [
        {
            id: 1,
            username: "Мария Иванова",
            description: "Веб-сайт для знакмоств с реализацией чата",
            search_skills: ["Frontend-разработчик"],
            type: "Учебный",
            course: [1, 2],
            customer: true,
            team: [["Мария", ["Дизайнер"]], ["Илья", ["Backend-разработчик"]]]
        },

        {
            id: 2,
            username: "Мария Иванова",
            description: "Telegram-бот для поиска музыки по названию",
            search_skills: ["Backend-разработчик"],
            type: "Учебный",
            course: [3],
            customer: false,
            team: [["Мария", ["Менеджер", "Backend-разработчик"]]]
        }
    ]
}
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
                <p className="user-telegram">{User.telegram}</p>
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