import { createSlice } from "@reduxjs/toolkit";

const savedRole = localStorage.getItem("role") || "viewer";

const initialState ={
    currentRole: savedRole,
}


const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
    setRole: (state, action) => {
      state.currentRole = action.payload;
      localStorage.setItem("role", action.payload);
    },
  },

})

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;