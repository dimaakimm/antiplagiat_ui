import styles from './ProjectHeader.module.scss'
import { Outlet, useParams } from 'react-router-dom'
import Button from '../../atoms/Button/Button.tsx'
import Typography from '../../atoms/Typography/Typography.tsx'
import { projectHeaderGeneralInfo } from '../../../mockedData/mockedProjectData.ts'

const ProjectHeader = () => {
    const { id } = useParams<{ id: string }>()

    return (
        <>
            <div className={styles.headerWrapper}>
                <div className={styles.mainInfo}>
                    <div className={styles.projectTitle}>
                        <Typography>Project: {id}</Typography>
                    </div>
                    <Button>
                        <Typography dType="r16">Выйти</Typography>
                    </Button>
                </div>
                <div className={styles.generalInfo}>
                    {projectHeaderGeneralInfo.map((data) => (
                        <Typography dType="r16">
                            {data.statistics}: {data.value}
                        </Typography>
                    ))}
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default ProjectHeader
