import styles from './Header.module.scss'
import { Outlet } from 'react-router-dom'
import Typography from '../../atoms/Typography/Typography.tsx'
import Button from '../../atoms/Button/Button.tsx'

const Header = () => {
    let uuid = localStorage.getItem('Guest-UUID')
    const onExitClick = () => {
        localStorage.removeItem('Guest-UUID')
        window.location.reload()
    }
    return (
        <>
            <div className={styles.headerWrapper}>
                <div className={styles.mainInfo}>
                    <Typography>Вы вошли под GUID: {uuid}</Typography>
                </div>
                <div className={styles.exitButton}>
                    <Button onClick={onExitClick}>Выйти из аккаунта</Button>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Header
