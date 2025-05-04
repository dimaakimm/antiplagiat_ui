import * as Yup from 'yup'
import { FormValues } from '../model/createProjectModal.types.ts'

export const validationSchema: Yup.ObjectSchema<FormValues> = Yup.object({
    participants: Yup.array()
        .of(
            Yup.object({
                fullName: Yup.string().required('Обязательное поле'),
                github: Yup.string()
                    .url('Неверная ссылка')
                    .required('Обязательное поле'),
            })
        )
        .defined(),
})
