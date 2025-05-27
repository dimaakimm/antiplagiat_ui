import styles from './MainPage.module.scss'
import ProjectsTable from '../../organisms/ProjectsTable/ProjectsTable.tsx'
import { useGetProjectsQuery } from '../../../api/projects/projectsApi.ts'

const MainPage = () => {
    const { data, isLoading, isError } = useGetProjectsQuery(null)
    // const { data: wdwad } = useRegisterQuery({
    //     name: 'wdqwf',
    //     email: 'string',
    //     password: 'string',
    // })
    return (
        <div className={styles.wrapper}>
            <ProjectsTable
                isError={isError}
                isLoading={isLoading}
                projects={data}
            />
        </div>
    )
}

export default MainPage
