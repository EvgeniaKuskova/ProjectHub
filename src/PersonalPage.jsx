import './App.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ProjectCard } from './ProjectCard';
import './PersonalPage.css';
import { getMe, getMyCards, deleteCard } from './Client.js';
import homeImage from "./assets/home.png";
import defaultUserImage from "./assets/default-user.png";


export function PersonalPage() {
    const [projects, setProjects] = useState([]); // Состояние для хранения проектов
    const navigate = useNavigate();

    const [userData, setUserData] = useState({ username: "Неизвестный", telegram_id: "Не указан" }); // Состояние для данных пользователя

    useEffect(() => {
        async function fetchCards() {
            try {
                const cardsData = await getMyCards();
                if (cardsData && cardsData.length > 0) {
                    const mappedProjects = cardsData.map((card, index) => ({
                        id: index + 1,
                        username: card.title || "Неизвестный",
                        description: card.description || "Нет описания",
                        search_skills: card.who_needs.map(reader => reader.skill) || ["Навык не указан"],
                        type: card.type === 'pet'? "Пет-проект" : "Учебный",
                        course: Array.from(new Set(card.who_needs.map(member => member.grade).filter(Boolean))) || [1],
                        customer: card.customer || false,
                        telegram_id: card.telegram_id,
                        team: card.teammates.map(member => ({
                            name: member.name,
                            skill: member.skill
                        })) || [],
                        tech_stack: card.tech_stack,
                    }));

                    setProjects(mappedProjects); // Сохраняем проекты в состоянии
                }
            } catch (error) {
                console.error('Ошибка получения карточек:', error);
            }
        }

        async function getUser() {
            try {
                const userData = await getMe();
                setUserData({
                    username: `${userData.name} ${userData.surname}`,
                    telegram_id: userData.telegram_id,
                });
            }
            catch (error) {
                console.error('Ошибка получения пользователя:', error);
            }
        }

        fetchCards();
        getUser();
    }, []); // Пустой массив зависимостей для однократного вызова

    // Функция удаления карточки
    const handleDelete = async (projectId) => {
        try {
            const projectToDelete = projects.find(project => project.id === projectId);

            if (!projectToDelete) {
                console.error('Проект не найден');
                return;
            }

            // Вызываем метод удаления
            await deleteCard({
                title: projectToDelete.username,
                description: projectToDelete.description,
                teammates: projectToDelete.team.map(member => ({
                    name: member.name,
                    skill: member.skill
                })),
                who_needs: projectToDelete.search_skills.map(skill => ({ skill, grade: projectToDelete.course[0]})),
                tech_stack: projectToDelete.tech_stack,
                customer: projectToDelete.customer,
                telegram_id: projectToDelete.telegram_id,
                type: projectToDelete.type === "Учебный" ? "study" : "pet"
            });

            // Удаляем проект из состояния
            setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId));
            console.log(`Проект с ID ${projectId} успешно удален`);
        } catch (error) {
            console.error('Ошибка при удалении проекта:', error.message);
        }
    };

    return (
        <div className="personal-container">
            <header className="header">
                <h1 className="site-title" onClick={() => navigate('/')}>ProjectHub</h1>
                <img
                    src={homeImage}
                    alt="Home Icon"
                    className="home-icon"
                    onClick={() => navigate('/')}
                />
            </header>

            <div className="profile-container">
                <img
                    src={defaultUserImage}
                    alt="User Profile"
                    className="profile-icon"
                />
                <p className="user-name">{userData.username}</p>
                <a
                    href={`https://t.me/${userData.telegram_id.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="user-telegram"
                >
                    {userData.telegram_id}
                </a>
            </div>

            <div className="projects-container">
                <p className="my-projects">Мои объявления</p>

                <div className="personal-projects-grid">
                    {projects.length === 0 ? (
                        <div className="empty-projects-message">
                            Тут пока пусто... 😢
                        </div>
                    ) : (
                        projects.map(project => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                withDelete={true}
                                onDelete={() => handleDelete(project.id)}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}