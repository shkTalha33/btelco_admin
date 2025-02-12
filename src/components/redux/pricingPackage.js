/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export const pricingPackageSlice = createSlice({
  name: "pricingPackage",
  initialState: {
    packages: [],
  },
  reducers: {
    setPackages: (state, action) => {
      state.packages =  action.payload;
    },
    addAndUpdatePackage: (state, action) => {
      const newData = action.payload;
      const index = state.packages.findIndex(item => item._id === newData._id)
      if (index === -1) {
        state.packages.unshift(newData) 
      }else{
        state.packages[index] = newData
      }
    },
    removePackage: (state, action) => {
        const id = action.payload?._id
        const index = state.packages.findIndex(item => item?._id === id)
        if (index !== -1) {
            state.packages.splice(index, 1)
        }
    },
  },
});

export const { setPackages, addAndUpdatePackage, removePackage } = pricingPackageSlice.actions;

export default pricingPackageSlice.reducer;
