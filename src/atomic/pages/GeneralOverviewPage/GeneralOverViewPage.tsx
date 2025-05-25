import styles from './GeneralOverViewPage.module.scss'
import Graphics from '../../organisms/Graphics/Graphics.tsx'
import WorksTable from '../../organisms/WorksTable/WorksTable.tsx'
import { useGetMatchesQuery } from '../../../api/projects/projectsApi.ts'
import { useNavigate, useParams } from 'react-router-dom'

const GeneralOverViewPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { data: comparisons, isError } = useGetMatchesQuery({
        projectId: Number(id) || 1,
    })

    if (isError) navigate('/')

    return (
        <div className={styles.wrapper}>
            <Graphics data={comparisons || []} />
            <WorksTable projectId={id} data={comparisons || []} />
        </div>
    )
}

export default GeneralOverViewPage
