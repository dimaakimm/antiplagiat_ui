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
    userId: string
    name: string
    repositoryUrls: string[]
    language: string
}

interface createProjectResp {
    id: number
    name: string
    status: string
}

interface compareRepositoriesResp {
    numberOfRepositories: number
    numberOfFiles: number
    numberOfSuspiciousFiles: number
    maxSimilarity: number
    averageSimilarity: number
}

export interface getMatchesResp {
    firstRepositoryId: number
    firstRepositoryOwner: string
    secondRepositoryId: number
    secondRepositoryOwner: string
    percentage: number
}
interface getMatchesReq {
    projectId: number
}

const userId = localStorage.getItem('userId')

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
                url: `${ApiFilesEndpoints.CREATE_PROJECT}`,
                method: 'POST',
                body: { ...regReq },
            }),
            invalidatesTags: ['Projects'],
        }),
        compareRepositories: builder.query<compareRepositoriesResp[], number>({
            query: (projectId) => ({
                url: `${ApiFilesEndpoints.PROJECT_COMPARE}/${projectId}`,
                method: 'POST',
            }),
        }),
        getProjects: builder.query<createProjectResp[], null>({
            query: () => ({
                url: `${ApiFilesEndpoints.GET_ALL_PROJECTS}?userId=${userId}`,
                method: 'GET',
            }),
            providesTags: ['Projects'],
        }),
        getMatches: builder.query<getMatchesResp[], getMatchesReq>({
            query: ({ projectId }) => ({
                url: `${ApiFilesEndpoints.GET_MATCHES}/${userId}/${projectId}`,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useRegisterQuery,
    useCreateProjectMutation,
    useGetProjectsQuery,
    useCompareRepositoriesQuery,
    useGetMatchesQuery,
} = projectsApiSlice
