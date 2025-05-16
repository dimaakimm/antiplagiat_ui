import styles from './GeneralOverViewPage.module.scss'
import Graphics from '../../organisms/Graphics/Graphics.tsx'
import WorksTable from '../../organisms/WorksTable/WorksTable.tsx'
import { useGetMatchesQuery } from '../../../api/projects/projectsApi.ts'
import { useParams } from 'react-router-dom'

const GeneralOverViewPage = () => {
    const { id } = useParams<{ id: string }>()

    const { data: comparisons, isLoading } = useGetMatchesQuery({
        projectId: Number(id) || 1,
    })
    return (
        <div className={styles.wrapper}>
            <Graphics data={comparisons || []} isLoading={isLoading} />
            <WorksTable data={comparisons || []} isLoading={isLoading} />
        </div>
    )
}

export default GeneralOverViewPage
