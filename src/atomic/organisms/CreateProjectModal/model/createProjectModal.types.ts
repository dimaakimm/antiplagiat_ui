export interface Participant {
    fullName: string
    github: string
}

export interface FormValues {
    participants: Participant[]
}

export interface CreateProjectModalProps {
    isOpen: boolean
    onRequestClose: () => void
}
