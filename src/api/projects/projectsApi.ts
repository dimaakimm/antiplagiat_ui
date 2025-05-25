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
interface getSuspiciousReq {
    projectId: string
    firstRepositoryId: string
    secondRepositoryId: string
}
interface getSuspiciousFileResp {
    id: string
    percentage: string
    firstFileId: string
    firstRepositoryId: string
    firstFileName: string
    secondFileId: string
    secondFileName: string
    secondRepositoryId: string
    tiles: {
        startLineInFirstFile: string
        endLineInFirstFile: string
        endLineInSecondFile: string
        textInFirstFile: string
        textInSecondFile: string
    }[]
}

const userId = localStorage.getItem('userId')

export const projectsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createProject: builder.mutation<createProjectResp, createProjectReq>({
            query: (regReq) => ({
                url: `${ApiFilesEndpoints.CREATE_PROJECT}`,
                method: 'POST',
                body: { ...regReq },
            }),
            invalidatesTags: ['Projects'],
        }),
        register: builder.query<RegResp, RegReq>({
            query: (regReq) => ({
                url: `${ApiFilesEndpoints.REGISTER}`,
                method: 'POST',
                body: { ...regReq },
            }),
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
        getSuspiciousFiles: builder.query<
            { id: string; name: string }[],
            getSuspiciousReq
        >({
            query: ({ projectId, firstRepositoryId, secondRepositoryId }) => ({
                url: `${ApiFilesEndpoints.GET_SUSPICIOUS}/${projectId}/${firstRepositoryId}/${secondRepositoryId}`,
                method: 'GET',
            }),
        }),
        getSuspiciousFile: builder.query<
            getSuspiciousFileResp[],
            {
                fileId: string
                firstRepositoryId: string
                secondRepositoryId: string
            }
        >({
            query: ({ fileId, firstRepositoryId, secondRepositoryId }) => ({
                url: `${ApiFilesEndpoints.GET_SUSPICIOUS_FILE}/${fileId}/${firstRepositoryId}/${secondRepositoryId}`,
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
    useGetSuspiciousFilesQuery,
    useGetSuspiciousFileQuery,
} = projectsApiSlice
