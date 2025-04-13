import styles from './GeneralOverViewPage.module.scss'
import Graphics from '../../organisms/Graphics/Graphics.tsx'
import WorksTable from '../../organisms/WorksTable/WorksTable.tsx'
import { comparisons } from '../../../mockedData/mockedProjectData.ts'

const GeneralOverViewPage = () => {
    return (
        <div className={styles.wrapper}>
            <Graphics data={comparisons} />
            <WorksTable data={comparisons} />
        </div>
    )
}

export default GeneralOverViewPage
