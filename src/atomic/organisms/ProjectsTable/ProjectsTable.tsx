import styles from './ProjectsTable.module.scss'
import Typography from '../../atoms/Typography/Typography.tsx'
import Button from '../../atoms/Button/Button.tsx'
import { useNavigate } from 'react-router-dom'

interface ProjectsTableProps {
    projects: { name: string; link: string }[]
}
const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects }) => {
    const navigate = useNavigate()

    return (
        <div className={styles.projects}>
            <Typography>Ваши проекты:</Typography>
            <div className={styles.projects}>
                {projects.map((project) => (
                    <div className={styles.project}>
                        <Typography dType="r20">{project.name}</Typography>
                        <Button onClick={() => navigate(project.link)}>
                            <Typography dType="r20">Перейти</Typography>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProjectsTable
