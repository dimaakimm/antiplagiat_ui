import React from 'react'
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
} from './model/createProjectModal.types.ts'
import { validationSchema } from './lib/projectsValidationSchema.ts'

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
    isOpen,
    onRequestClose,
}) => {
    const initialValues: FormValues = {
        participants: [
            { fullName: '', github: '' },
            { fullName: '', github: '' },
        ],
    }

    return (
        <Modal
            className={styles.modal}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Создание проекта"
        >
            <Typography>Создание проекта</Typography>

            <Formik<FormValues>
                validateOnChange={false}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values)
                    onRequestClose
                }}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    errors,
                    touched,
                }: FormikProps<FormValues>) => (
                    <form onSubmit={handleSubmit}>
                        <FieldArray name="participants">
                            {({ push, remove }: FieldArrayRenderProps) => (
                                <>
                                    {values.participants.map(
                                        (participant, index) => {
                                            const participantErrors =
                                                typeof errors.participants?.[
                                                    index
                                                ] === 'object'
                                                    ? (errors.participants[
                                                          index
                                                      ] as FormikErrors<
                                                          typeof participant
                                                      >)
                                                    : undefined

                                            const participantTouched =
                                                touched.participants?.[index]

                                            return (
                                                <div
                                                    key={index}
                                                    className={styles.works}
                                                >
                                                    <FormInput
                                                        name={`participants[${index}].fullName`}
                                                        className={styles.input}
                                                        placeholder="ФИО проверяемого"
                                                        value={
                                                            participant.fullName
                                                        }
                                                        onChange={handleChange}
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
                                                        className={styles.input}
                                                        placeholder="Ссылка на гитхаб"
                                                        value={
                                                            participant.github
                                                        }
                                                        onChange={handleChange}
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
                                                                remove(index)
                                                            }
                                                        >
                                                            Удалить участника
                                                        </Button>
                                                    )}
                                                </div>
                                            )
                                        }
                                    )}
                                    <Button
                                        actionType="button"
                                        onClick={() =>
                                            push({ fullName: '', github: '' })
                                        }
                                    >
                                        Добавить участника
                                    </Button>
                                    <Button actionType="submit">Создать</Button>
                                </>
                            )}
                        </FieldArray>
                    </form>
                )}
            </Formik>
        </Modal>
    )
}

export default CreateProjectModal
