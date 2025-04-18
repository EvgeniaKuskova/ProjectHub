import './App.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ProjectCard } from './ProjectCard';
import './PersonalPage.css';
import { getMyCards, deleteCard } from './Client.js'; // Импортируем DeleteCard

let name = "Неизвестный";
let tg = "Не указан";

export function PersonalPage() {
    const [projects, setProjects] = useState([]); // Состояние для хранения проектов
    const navigate = useNavigate();

    // Загрузка данных при монтировании компонента
    useEffect(() => {
        async function fetchCards() {
            try {
                const cardsData = await getMyCards();
                if (cardsData && cardsData.length > 0) {
                    const firstCard = cardsData[0];
                    name = firstCard.teammates && firstCard.teammates.length > 0
                        ? firstCard.teammates[0].name
                        : "Неизвестный";
                    tg = firstCard.telegram_id || "Не указан";

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

        fetchCards();
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
                <p className="user-name">{name}</p>
                <p className="user-telegram">{tg}</p>
            </div>

            <div className="projects-container">
                <p className="my-projects">Мои объявления</p>

                <div className="personal-projects-grid">
                    {projects.map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            withDelete={true}
                            onDelete={() => handleDelete(project.id)} // Передаем обработчик удаления
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}