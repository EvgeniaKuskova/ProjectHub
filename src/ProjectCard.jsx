import React from 'react';
import './Card.css'

const FieldWithCustomers = ({project}) => {
    if (project.customer === true) {
        return <h3 className="FieldCustomers">Есть заказчик</h3>;
    }
    return null;
}

const TeamList = ({ team }) => {
    return (
        <div className="team-list">
            {team.map((member, index) => (
                <div key={index} className="team-member">
                    {member.name}: {member.skills.join(', ')}
                </div>
            ))}
        </div>
    );
};

export const ProjectCard = ({project, withDelete = false}) => {
    const handleDelete = () => {
        console.log('Удаление проекта:', project.id);
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
                    <p className="project-search_skills">{project.search_skills}</p>
                    <h3 className="project-type-heading">Тип</h3>
                    <p className="project-type">{project.type}</p>
                    <h3 className="project-course-heading">Курс</h3>
                    <p className="project-course">{project.course.join(', ')}</p>
                    <FieldWithCustomers project={project}/>
                </div>

                <div className="project-team-column">
                    <h3 className="project-team-heading">В команде уже есть</h3>
                    <TeamList team={project.team}/>
                    {withDelete && (<img
                            src="src/assets/trash-can.png"
                            alt="Trash-can Icon"
                            className="trash-can-icon"
                            onClick={handleDelete}
                        />)}
                </div>
            </div>
        </div>)
}