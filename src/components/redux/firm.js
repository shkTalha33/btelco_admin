import { createSlice } from "@reduxjs/toolkit";

const firmSlice = createSlice({
  name: "firm",
  initialState: {
    allFirms: [],
  },
  reducers: {
    setAllFirms: (state, action) => {
      state.allFirms = action.payload;
    },
    addAndUpdateFirm: (state, action) => {
      const newFirm =  action.payload
      const index = state.allFirms.findIndex(index => index?._id === newFirm?._id)
      if (index !== -1) {
        state.allFirms[index] = newFirm
      }else{
        state.allFirms.push(newFirm)
      }
    },
    addFirmAdmin: (state, action) => {
      const newAdmin = action.payload;
      const { company, ...admin } = newAdmin;
      const index = state.allFirms.findIndex((firm) => firm?._id === company);
      if (index !== -1) {
        state.allFirms[index].admin = admin;
      }
    }
  },
});

export const { setAllFirms, addAndUpdateFirm, addFirmAdmin } = firmSlice.actions;

export default firmSlice.reducer;
