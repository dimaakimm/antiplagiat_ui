import styles from './ComparisonPage.module.scss'
import { useParams } from 'react-router-dom'
import { useGetSuspiciousFilesQuery } from '../../../api/projects/projectsApi.ts'
import DetailedComparison from '../../organisms/DetailedComparison/DetailedComparison.tsx'

const ComparisonPage = () => {
    const { projectId, firstRepositoryId, secondRepositoryId } = useParams()
    const projectIdReq = projectId || ''
    const firstRepositoryIdReq = firstRepositoryId || ''
    const secondRepositoryIdReq = secondRepositoryId || ''

    const { data = [] } = useGetSuspiciousFilesQuery({
        projectId: projectIdReq,
        firstRepositoryId: firstRepositoryIdReq,
        secondRepositoryId: secondRepositoryIdReq,
    })
    const isSuccess =
        data && projectId && firstRepositoryId && secondRepositoryId

    return (
        <div className={styles.wrapper}>
            {isSuccess && (
                <DetailedComparison
                    files={data}
                    firstRepositoryId={firstRepositoryId}
                    secondRepositoryId={secondRepositoryId}
                />
            )}
        </div>
    )
}

export default ComparisonPage
