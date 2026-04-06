import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./slices/uiSlice";
import roleReducer from "./slices/roleSlice";
import transactionsReducer from "./slices/transactionsSlice";

const saveState = (state) => {
  try {
    localStorage.setItem(
      "financeState",
      JSON.stringify({
        transactions: state.transactions,
        role: state.role,
      })
    );
  } catch {}
};

const loadState = () => {
  try {
    const serialized = localStorage.getItem("financeState");
    return serialized ? JSON.parse(serialized) : undefined;
  } catch {
    return undefined;
  }
};

const store = configureStore({
    reducer: {
        ui: uiReducer,
        role: roleReducer,
        transactions: transactionsReducer,
    },
    preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;