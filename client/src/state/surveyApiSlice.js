import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = "http://localhost:3030"

export const surveyApiSlice = createApi({
    reducerPath: 'surveyApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: BASE_URL, 
        prepareHeaders: (headers, {getState}) => {
            const authToken = getState().authentication.token;
            if (authToken) {
              headers.set('authorization', `Bearer ${authToken}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (body) => ({
                url: 'users',
                method: 'POST',
                body: body,
            }),
          }),
        loginUser: builder.mutation({
            query: (body) => ({
                url: 'authentication',
                method: 'POST',
                body: body,
            }),
        }),
        getOneSurvey : builder.query({
            query: (hash) => ({
                url: "surveys?hash=" + hash
            }),
            cacheStrategy: false,
        }),
        getSurveys: builder.query({
            query: (userID) => ({
                url: 'surveys?userId=' + userID
            }),
            cacheStrategy: false,
        }),
        createSurvey: builder.mutation({
            query: (body) => ({
                url: 'surveys',
                method: 'POST',
                body: body,
            }),
        }),
        modifySurvey : builder.mutation({
            query: ([questionId, body]) => ({
                url: 'surveys/' + questionId,
                method: 'PATCH',
                body: body,
            }),
        }),
        deleteSurvey : builder.mutation({
            query: (surveyId) => ({
                url: 'surveys/' + surveyId,
                method: 'DELETE',
            }),
        }),
        getResults: builder.query({
            query: (surveyId) => 'results?surveyId=' + surveyId,
            cacheStrategy: false,
        }),
        sendAnswer: builder.mutation({
            query: (body) => ({
                url: 'results',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useGetOneSurveyQuery,
    useGetSurveysQuery,
    useCreateSurveyMutation,
    useModifySurveyMutation,
    useDeleteSurveyMutation,
    useGetResultsQuery,
    useSendAnswerMutation,
} = surveyApiSlice;
  
export default surveyApiSlice.reducer;
