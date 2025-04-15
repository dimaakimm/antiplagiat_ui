import { generateUUID } from '../utils/generateUUID.ts'
import { Outlet } from 'react-router-dom'

const GUIDAuth = () => {
    const uuid = localStorage.getItem('Guest-UUID')
    if (!uuid) {
        const temporaryUUID = generateUUID()
        localStorage.setItem('Guest-UUID', temporaryUUID)
    }

    return <Outlet />
}

export default GUIDAuth
