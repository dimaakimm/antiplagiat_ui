import styles from './MainPage.module.scss'
import { projects } from '../../../mockedData/mockedProjectData.ts'
import ProjectsTable from '../../organisms/ProjectsTable/ProjectsTable.tsx'

const MainPage = () => {
    return (
        <div className={styles.wrapper}>
            <ProjectsTable projects={projects} />
        </div>
    )
}

export default MainPage
