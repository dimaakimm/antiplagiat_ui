import styles from './ProjectHeader.module.scss'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import Button from '../../atoms/Button/Button.tsx'
import Typography from '../../atoms/Typography/Typography.tsx'
import { useCompareRepositoriesQuery } from '../../../api/projects/projectsApi.ts'
import { translations } from '../../../assets/translations.ts'

const ProjectHeader = () => {
    const { id } = useParams<{ id: string }>()
    const { projectId } = useParams<{ projectId: string }>()

    const navigate = useNavigate()
    const { data: generealProjectData } = useCompareRepositoriesQuery(
        Number(id || projectId)
    )
    const isComparison = location.pathname.startsWith('/comparison')

    return (
        <>
            <div className={styles.headerWrapper}>
                <div className={styles.mainInfo}>
                    <div className={styles.projectTitle}>
                        <Typography dType="r32">
                            ID проекта: {id || projectId}
                        </Typography>
                    </div>
                    {!isComparison && (
                        <Button onClick={() => navigate('/')}>
                            <Typography dType="r16">Выйти</Typography>
                        </Button>
                    )}
                    {isComparison && (
                        <Button onClick={() => navigate(-1)}>
                            <Typography dType="r16">Назад</Typography>
                        </Button>
                    )}
                </div>
                {generealProjectData && (
                    <div className={styles.generalInfo}>
                        {Object.entries(generealProjectData).map(
                            (data, index) => (
                                <Typography dType="r16" key={index}>
                                    {translations[data[0]]}:{' '}
                                    {data[1].toString()}
                                </Typography>
                            )
                        )}
                    </div>
                )}
            </div>
            <Outlet />
        </>
    )
}

export default ProjectHeader
