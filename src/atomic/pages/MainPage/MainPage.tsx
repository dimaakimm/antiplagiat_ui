import styles from './MainPage.module.scss'
import ProjectsTable from '../../organisms/ProjectsTable/ProjectsTable.tsx'
import { useGetProjectsQuery } from '../../../api/projects/projectsApi.ts'

const MainPage = () => {
    const { data } = useGetProjectsQuery(null)

    return (
        <div className={styles.wrapper}>
            <ProjectsTable projects={data} />
        </div>
    )
}

export default MainPage
