import React, {useState} from 'react';
import './Card.css'

const FieldWithCustomers = ({project}) => {
    if (project.customer === true) {
        return <h3 className="FieldCustomers">Есть заказчик</h3>;
    }
    return null;
}

const TeamList = ({ team }) => {
    console.log('Team data:', team);
    return (
        <div className="team-list">
            {team.map((member, index) => (
                <div key={index} className="team-member">
                    {member.name}: {member.skill}
                </div>
            ))}
        </div>
    );
};

export const ProjectCard = ({project, withDelete = false, onDelete}) => {
    const [showButton, setShowButton] = useState(true);

    const handleClick = async () => {
        setShowButton(false)
        try {
            const response = await fetch('/api/metrics/contacted', {
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

    return (<div className="project-card">
            <div className="project-header">
                <img
                    src={"src/assets/default-user.png"}
                    alt="User Avatar"
                    className="project-avatar"
                />
                <h3 className="project-username">{project.username}</h3>
            </div>

            <div className="project-content">
                <div className="project-description-column">
                    <h3 className="project-description-heading">Идея</h3>
                    <p className="project-description">{project.description}</p>
                    <h3 className="project-search_skills-heading">Ищу</h3>
                    <p className="project-search_skills">{project.search_skills.join(', ')}</p>
                    <h3 className="project-type-heading">Тип</h3>
                    <p className="project-type">{project.type}</p>
                    <h3 className="project-course-heading">Курс</h3>
                    <p className="project-course">{project.course}</p>
                    <FieldWithCustomers project={project}/>
                </div>

                <div className="project-team-column">
                    <h3 className="project-team-heading">В команде уже есть</h3>
                    <TeamList team={project.team}/>
                    {withDelete && (<img
                            src="src/assets/trash-can.png"
                            alt="Trash-can Icon"
                            className="trash-can-icon"
                            onClick={onDelete}
                        />)}
                    {!withDelete && showButton && (<button onClick={handleClick} className="metric">Связаться</button>)}
                    {!withDelete && !showButton && (
                        <a
                            href={`https://t.me/${project.telegram_id.replace('@', '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="metric_text"
                        >
                            {project.telegram_id}
                        </a>
                    )}
                </div>
            </div>
        </div>)
}