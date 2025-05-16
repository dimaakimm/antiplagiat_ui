import React, { useState } from 'react'
import Modal from 'react-modal'
import {
    Formik,
    FieldArray,
    FormikProps,
    FieldArrayRenderProps,
    FormikErrors,
} from 'formik'

import Typography from '../../atoms/Typography/Typography'
import FormInput from '../../atoms/FormInput/FormInput'
import styles from './CreateProjectModal.module.scss'
import Button from '../../atoms/Button/Button.tsx'
import {
    CreateProjectModalProps,
    FormValues,
    Participant,
} from './model/createProjectModal.types.ts'
import { validationSchema } from './lib/projectsValidationSchema.ts'
import Select from '../../atoms/Select/Select.tsx'
import { useCreateProjectMutation } from '../../../api/projects/projectsApi.ts'

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
    isOpen,
    onRequestClose,
}) => {
    const [createProject, { isLoading, error }] = useCreateProjectMutation()
    const initialValues: FormValues = {
        projectName: '',
        participants: [
            { fullName: '', github: '' },
            { fullName: '', github: '' },
        ],
    }
    const options = ['JAVA', 'CPP', 'PY', 'GO']
    const [language, setLanguage] = useState(options[0])
    const userId = localStorage.getItem('userId')

    function getGithubLinks(participants: Participant[]): string[] {
        return participants.map((participant) => participant.github)
    }

    console.log(error)

    return (
        <Modal
            className={styles.modal}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Создание проекта"
        >
            <Formik<FormValues>
                validateOnChange={false}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    const data = {
                        language: language,
                        repositoryUrls: getGithubLinks(values.participants),
                        name: values.projectName,
                        userId: userId || '',
                    }
                    await createProject(data)
                    onRequestClose()
                }}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                }: FormikProps<FormValues>) => (
                    <>
                        <div className={styles.modalHeader}>
                            <Typography dType="r24">
                                Создание проекта
                            </Typography>
                            {touched.projectName && errors.projectName && (
                                <div className={styles.error}>
                                    {errors.projectName}
                                </div>
                            )}
                            <FormInput
                                value={values.projectName}
                                name="projectName"
                                onChange={handleChange}
                                placeholder="Название проекта"
                            />
                        </div>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <FieldArray name="participants">
                                {({ push, remove }: FieldArrayRenderProps) => (
                                    <>
                                        {values.participants.map(
                                            (participant, index) => {
                                                const participantErrors =
                                                    typeof errors
                                                        .participants?.[
                                                        index
                                                    ] === 'object'
                                                        ? (errors.participants[
                                                              index
                                                          ] as FormikErrors<
                                                              typeof participant
                                                          >)
                                                        : undefined

                                                const participantTouched =
                                                    touched.participants?.[
                                                        index
                                                    ]

                                                return (
                                                    <div
                                                        key={index}
                                                        className={styles.works}
                                                    >
                                                        <FormInput
                                                            name={`participants[${index}].fullName`}
                                                            className={
                                                                styles.input
                                                            }
                                                            placeholder="ФИО проверяемого"
                                                            value={
                                                                participant.fullName
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                        {participantTouched?.fullName &&
                                                            participantErrors?.fullName && (
                                                                <div
                                                                    className={
                                                                        styles.error
                                                                    }
                                                                >
                                                                    {
                                                                        participantErrors.fullName
                                                                    }
                                                                </div>
                                                            )}

                                                        <FormInput
                                                            name={`participants[${index}].github`}
                                                            className={
                                                                styles.input
                                                            }
                                                            placeholder="Ссылка на гитхаб"
                                                            value={
                                                                participant.github
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                        {participantTouched?.github &&
                                                            participantErrors?.github && (
                                                                <div
                                                                    className={
                                                                        styles.error
                                                                    }
                                                                >
                                                                    {
                                                                        participantErrors.github
                                                                    }
                                                                </div>
                                                            )}

                                                        {values.participants
                                                            .length > 1 && (
                                                            <Button
                                                                actionType="button"
                                                                onClick={() =>
                                                                    remove(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <Typography dType="r20">
                                                                    Удалить
                                                                    участника
                                                                </Typography>
                                                            </Button>
                                                        )}
                                                    </div>
                                                )
                                            }
                                        )}
                                        <Button
                                            actionType="button"
                                            onClick={() =>
                                                push({
                                                    fullName: '',
                                                    github: '',
                                                })
                                            }
                                        >
                                            <Typography dType="r20">
                                                Добавить участника
                                            </Typography>
                                        </Button>
                                        <div className={styles.modalFooter}>
                                            <div
                                                className={styles.selectSection}
                                            >
                                                <Typography dType="r20">
                                                    Выбор ЯП:
                                                </Typography>
                                                <Select
                                                    options={options}
                                                    onChange={setLanguage}
                                                    value={language}
                                                />
                                            </div>

                                            <Button
                                                actionType="submit"
                                                disabled={isLoading}
                                            >
                                                <Typography dType="r20">
                                                    {isLoading
                                                        ? 'Загрузка...'
                                                        : 'Создать проект'}
                                                </Typography>
                                            </Button>
                                        </div>
                                        {error &&
                                            'data' in error &&
                                            typeof error.data === 'object' &&
                                            error.data &&
                                            'error' in error.data &&
                                            typeof error.data?.error ===
                                                'string' && (
                                                <div className={styles.error}>
                                                    <Typography>
                                                        Ошибка:{' '}
                                                        {error.data.error}
                                                    </Typography>
                                                </div>
                                            )}
                                    </>
                                )}
                            </FieldArray>
                        </form>
                    </>
                )}
            </Formik>
        </Modal>
    )
}

export default CreateProjectModal
