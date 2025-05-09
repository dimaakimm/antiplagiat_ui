import { apiSlice } from '../apiSlice.ts'
import { ApiFilesEndpoints } from '../endpoints.ts'

interface RegReq {
    name: string
    email: string
    password: string
}
interface RegResp {
    id: string
    name: string
    email: string
}

interface createProjectReq {
    userId: string | number
    name: string
    repositoryUrls: string[]
    language: string
}

interface createProjectResp {
    id: number
    name: string
    status: string
}

export const projectsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.query<RegResp, RegReq>({
            query: (regReq) => ({
                url: `${ApiFilesEndpoints.REGISTER}`,
                method: 'POST',
                body: { ...regReq },
            }),
        }),
        createProject: builder.mutation<createProjectResp, createProjectReq>({
            query: (regReq) => ({
                url: `${ApiFilesEndpoints.REGISTER}`,
                method: 'POST',
                body: { ...regReq },
            }),
        }),
    }),
})

export const { useRegisterQuery, useCreateProjectMutation } = projectsApiSlice
