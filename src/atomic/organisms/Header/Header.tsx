import styles from './Header.module.scss'
import { Outlet } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <div className={styles.headerWrapper}>header</div>
            <Outlet />
        </>
    )
}

export default Header
