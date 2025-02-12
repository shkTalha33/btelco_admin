import { createSlice } from "@reduxjs/toolkit";

const faqSlice = createSlice({
    name: "faq",
    initialState: {
        allFaqs : [],
    },
    reducers: {
        setAllFaqs: (state, action) => {
            state.allFaqs = action.payload
        },
        setAddAndUpdateFaq: (state, action) => {
            const newFaq = action.payload
            const index = state.allFaqs.findIndex( faq => faq?._id === newFaq?._id )
            if(index !== -1) {
                state.allFaqs[index] = newFaq
            }else{
                state.allFaqs.unshift(newFaq)
            }
        },
        setDeleteFaq: (state, action) => {
            const newFaq = action.payload
            const deletedFaq = state.allFaqs.filter( faq => faq?._id !== newFaq?._id )
            state.allFaqs = deletedFaq
        },
    }
});

export const { setAllFaqs, setAddAndUpdateFaq, setDeleteFaq } = faqSlice.actions

export default faqSlice.reducer