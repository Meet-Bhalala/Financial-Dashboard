import { createSelector } from "@reduxjs/toolkit";
import { subDays, parseISO, isAfter } from "date-fns";

const selectAllTransactions = (state) => state.transactions.items;
const selectFilters = (state) => state.transactions.filters;

export const selectFilteredTransactions = createSelector(
  [selectAllTransactions, selectFilters],
  (items, filters) => {
    const cutoff = subDays(new Date(), Number(filters.dateRange));

    let result = items.filter((t) => {
      const date = parseISO(t.date);
      if (!isAfter(date, cutoff)) return false;
      if (filters.type !== "all" && t.type !== filters.type) return false;
      if (filters.category !== "all" && t.category !== filters.category)
        return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !t.description.toLowerCase().includes(q) &&
          !t.category.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });


    result = [...result].sort((a, b) => {
      if (filters.sortBy === "date") {
        const diff = new Date(b.date) - new Date(a.date);
        return filters.sortOrder === "desc" ? diff : -diff;
      }
      if (filters.sortBy === "amount") {
        const diff = b.amount - a.amount;
        return filters.sortOrder === "desc" ? diff : -diff;
      }
      if (filters.sortBy === "category") {
        return filters.sortOrder === "desc"
          ? b.category.localeCompare(a.category)
          : a.category.localeCompare(b.category);
      }
      return 0;
    });
    return result;
  }
);

export const selectSummary = createSelector([selectAllTransactions], (items) => {
  const now = new Date();
  const last30 = subDays(now, 30);
  const prev30 = subDays(now, 60);

  const recent = items.filter((t) => isAfter(parseISO(t.date), last30));
  const previous = items.filter((t) => {
    const d = parseISO(t.date);
    return isAfter(d, prev30) && !isAfter(d, last30);
  });

  const totalIncome = recent
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const totalExpenses = recent
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  const prevIncome = previous
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const prevExpenses = previous
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  const incomeDelta = prevIncome
    ? (((totalIncome - prevIncome) / prevIncome) * 100).toFixed(1)
    : 0;
  const expensesDelta = prevExpenses
    ? (((totalExpenses - prevExpenses) / prevExpenses) * 100).toFixed(1)
    : 0;
  const savingsDelta = prevIncome - prevExpenses ? (((balance - (prevIncome - prevExpenses)) / (prevIncome - prevExpenses)) * 100).toFixed(1) : 0;

  return {
    totalIncome,
    totalExpenses,
    balance,
    incomeDelta: Number(incomeDelta),
    expensesDelta: Number(expensesDelta),
    savingsDelta: Number(savingsDelta),
  };
});

export const selectCategorySpending = createSelector(
  [selectAllTransactions],
  (items) => {
    const now = new Date();
    const last30 = subDays(now, 30);
    const expenses = items.filter(
      (t) => t.type === "expense" && isAfter(parseISO(t.date), last30)
    );

    const byCategory = {};
    expenses.forEach((t) => {
      byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
    });

    return Object.entries(byCategory)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }
);

export const selectCategoriesForType = createSelector(
  [selectAllTransactions, (state, type) => type],
  (items, type) => {
    const categories = new Set();
    items
      .filter((t) => type === "all" || t.type === type)
      .forEach((t) => categories.add(t.category));
    return Array.from(categories).sort();
  }
);

export const selectRecentTransactions = createSelector(
  [selectAllTransactions],
  (items) => items.slice(0, 5)
);
