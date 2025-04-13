import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://pioneergas-manager.ru/api/v1',
    credentials: 'include',
    prepareHeaders: (headers) => {
        // Получаем или генерируем UUID
        let uuid = localStorage.getItem('Guest-UUID')

        if (!uuid) {
            uuid = self.crypto.randomUUID
                ? self.crypto.randomUUID()
                : Date.now().toString(36) +
                  Math.random().toString(36).substring(2)
            localStorage.setItem('Guest-UUID', uuid)
        }
        headers.set('Guest-UUID', uuid)

        return headers
    },
})

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    console.log(args, api, extraOptions)
    const result = await baseQuery(args, api, extraOptions)
    console.log(result)
    // if (result?.error?.status === 401) {
    //     const refreshResult = await baseQuery('/refresh', api, extraOptions)
    //     if (refreshResult?.data) {
    //         const user = (api.getState() as RootState).auth.user
    //         api.dispatch(
    //             authActions.setCredentials({
    //                 ...refreshResult.data,
    //                 user,
    //                 token: refreshResult.data.toString() || null,
    //                 refresh_token: refreshResult.data.toString() || null,
    //             })
    //         )
    //         result = await baseQuery(args, api, extraOptions)
    //     } else {
    //         api.dispatch(authActions.logOut())
    //     }
    // }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: ['Basket'],
})
