import styles from './MainPage.module.scss'
import { projects } from '../../../mockedData/mockedProjectData.ts'
import Typography from '../../atoms/Typography/Typography.tsx'
import Button from '../../atoms/Button/Button.tsx'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.wrapper}>
            mainPage
            <div className={styles.projects}>
                {projects.map((project) => (
                    <div>
                        <Typography>{project.name}</Typography>
                        <Button onClick={() => navigate(project.link)}>
                            Перейти
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MainPage
