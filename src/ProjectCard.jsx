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
    let metric;
    const [showButton, setShowButton] = useState(true); // Состояние для отображения кнопки

    const handleClick = () => {
        setShowButton(false)
        metric++;
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
                    {!withDelete && !showButton && (<p className="metric_text">{project.telegram_id}</p>)}
                </div>
            </div>
        </div>)
}