export interface Participant {
    fullName: string
    github: string
}

export interface FormValues {
    projectName: string
    participants: Participant[]
}

export interface CreateProjectModalProps {
    isOpen: boolean
    onRequestClose: () => void
}
