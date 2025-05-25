import styles from './ProjectsTable.module.scss'
import Typography from '../../atoms/Typography/Typography.tsx'
import Button from '../../atoms/Button/Button.tsx'
import ProjectRow from '../../molecules/ProjectRow/ProjectRow.tsx'
import { useState } from 'react'
import CreateProjectModal from '../CreateProjectModal/CreateProjectModal.tsx'

interface ProjectsTableProps {
    projects?: { id: number; name: string; status: string }[]
    isError: boolean
    isLoading: boolean
}
const ProjectsTable: React.FC<ProjectsTableProps> = ({
    projects,
    isError,
    isLoading,
}) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    return (
        <>
            <div className={styles.projects}>
                <div className={styles.mainInfo}>
                    <Typography>Ваши проекты:</Typography>
                    <Button onClick={openModal}>Создать проект</Button>
                </div>
                <div className={styles.projectsTable}>
                    {projects &&
                        projects?.map((project) => (
                            <ProjectRow
                                name={project.name}
                                id={project.id}
                                key={project.id}
                            />
                        ))}
                    {isError && (
                        <Typography className={styles.error}>
                            Возникла ошибка при загрузке проектов
                        </Typography>
                    )}
                    {isLoading && <Typography>Идет загрузка...</Typography>}
                </div>
            </div>
            <CreateProjectModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            />
        </>
    )
}

export default ProjectsTable
