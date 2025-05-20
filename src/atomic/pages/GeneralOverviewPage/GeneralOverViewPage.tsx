import styles from './GeneralOverViewPage.module.scss'
import Graphics from '../../organisms/Graphics/Graphics.tsx'
import WorksTable from '../../organisms/WorksTable/WorksTable.tsx'
import { useGetMatchesQuery } from '../../../api/projects/projectsApi.ts'
import { useParams } from 'react-router-dom'

const GeneralOverViewPage = () => {
    const { id } = useParams<{ id: string }>()

    const { data: comparisons } = useGetMatchesQuery({
        projectId: Number(id) || 1,
    })
    return (
        <div className={styles.wrapper}>
            <Graphics data={comparisons || []} />
            <WorksTable data={comparisons || []} />
        </div>
    )
}

export default GeneralOverViewPage
