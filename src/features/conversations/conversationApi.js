import { apiSlice } from "../api/apiSlice";

export const conversationsApi=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getConversations:builder.query({
            query:(email)=>`/conversations?participants_like=${email}&_sort=timestamp&_order=desc&page=1&_limit=${process.env.REACT_APP_CONVERSASION_PER_PAGE}`
        })
    })
})
export const {useGetConversationsQuery}=conversationsApi