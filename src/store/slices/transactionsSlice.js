import { createSlice } from "@reduxjs/toolkit";
import { generateMockTransactions } from "../../Data/mockTransactions";

const initialTransactions = generateMockTransactions();

const initialState={
    items: initialTransactions,
    filters: {
      search: "",
      type: "all", 
      category: "all",
      dateRange: "90",
      sortBy: "date", 
      sortOrder: "desc", 
    }
}

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.items.unshift({
        ...action.payload,
        id: action.payload.id || Math.random().toString(),
      });
    },
    updateTransaction: (state, action) => {
      const idx = state.items.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    deleteTransaction: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        search: "",
        type: "all",
        category: "all",
        dateRange: "90",
        sortBy: "date",
        sortOrder: "desc",
      };
    },
  },
});

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setFilter,
  resetFilters,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
