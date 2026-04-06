import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: localStorage.getItem("theme") || "light",
    sidebarOpen: true,
    mobileSidebarOpen: false,
    activeTab: "dashboard", // 'dashboard' | 'transactions' | 'insights'
    modalOpen: false,
    editingTransaction: null,
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
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
        openModal: (state, action) => {
            state.modalOpen = true;
            state.editingTransaction = action.payload || null;
        },
        closeModal: (state) => {
            state.modalOpen = false;
            state.editingTransaction = null;
        },
    },
});

export const { toggleTheme, toggleSidebar, openMobileSidebar, closeMobileSidebar, setActiveTab, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;