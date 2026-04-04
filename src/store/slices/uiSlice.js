import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: localStorage.getItem("theme") || "light",
    sidebarOpen: true,
    mobileSidebarOpen: false,
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
            localStorage.setItem("theme", state.theme);
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
        openMobileSidebar: (state) => {
            state.mobileSidebarOpen = true;
        },
        closeMobileSidebar: (state) => {
            state.mobileSidebarOpen = false;
        },
    },
});

export const { toggleTheme, toggleSidebar,openMobileSidebar,closeMobileSidebar } = uiSlice.actions;
export default uiSlice.reducer;