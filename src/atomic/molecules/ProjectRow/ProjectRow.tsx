import React from 'react'
import styles from '../../organisms/ProjectsTable/ProjectsTable.module.scss'
import Typography from '../../atoms/Typography/Typography.tsx'
import Button from '../../atoms/Button/Button.tsx'
import { useNavigate } from 'react-router-dom'

interface ProjectRowProps {
    name: string
    id: number
}
const ProjectRow: React.FC<ProjectRowProps> = ({ name, id }) => {
    const navigate = useNavigate()

    return (
        <div className={styles.project}>
            <Typography dType="r20">{name}</Typography>
            <Button onClick={() => navigate('/project/' + id)}>
                <Typography dType="r20">Перейти</Typography>
            </Button>
        </div>
    )
}

export default ProjectRow
