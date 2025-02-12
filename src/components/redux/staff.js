import { createSlice } from "@reduxjs/toolkit";

const staffSlice = createSlice({
    name:"staff",
    initialState: {
        allStaff: []
    },
    reducers:{
        setAndUpdateStaff: (state, action) => {
           const newStaff = action.payload
           const index = state.allStaff.findIndex( staff => staff?._id === newStaff?._id )
           if (index !== -1) {
            state.allStaff[index] = newStaff
           }else{
            state.allStaff.push(newStaff)
           }
        },
        setAllStaff: (state, action) => {
            state.allStaff = action.payload
        },
        setDeleteStaff: (state, action) => {
            state.allStaff = state.allStaff.filter((staff) => {
                return staff?._id !== action.payload?._id
            })
        }
    }
})

export const { setAndUpdateStaff, setAllStaff, setDeleteStaff } = staffSlice.actions

export default staffSlice.reducer