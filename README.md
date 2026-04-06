# Finance Dashboard UI

A frontend-only Finance Dashboard built for the assignment scenario of tracking and understanding personal financial activity.
The app focuses on:
- clean, responsive dashboard UI
- transaction exploration with filtering/sorting/search
- role-based behavior simulation (Viewer/Admin)
- basic financial insights from local data

No backend is required. Data is generated as mock transactions and persisted in local storage.
## Tech Stack

- React 19 + Vite
- Redux Toolkit + React Redux (state management)
- React Router (page navigation)
- Tailwind CSS v4 (styling)
- Recharts (charts)
- date-fns (date calculations)
- react-hot-toast (feedback toasts)

## Run Locally
Prerequisites:
- Node.js 18+
- npm

Install and start:
```bash
npm install
npm run dev
```

Build and preview:
```bash
npm run build
npm run preview
```

Lint:
```bash
npm run lint
```

## Assignment Requirement Coverage
### 1. Dashboard Overview

Implemented in:
- `src/pages/Dashboard/Dashboard.jsx`
- `src/components/SummaryCard/SummaryCard.jsx`
- `src/components/RevenueChart/RevenueChart.jsx`
- `src/components/RecentTable/RecentTable.jsx`

Includes:
- summary cards (Balance, Income, Expenses, Transaction count)
- time-based visualization (revenue trend line chart)
- categorical/table summary (recent orders)

### 2. Transactions Section
Implemented in:
- `src/pages/Transactions/Transactions.jsx`
- `src/components/TransactionTable/TransactionTable.jsx`
- `src/components/TransactionModal/TransactionModal.jsx`

Transaction details shown:
- date
- amount
- category
- type (income/expense)

Features:
- text search
- filter by type/category/date range
- sorting (date/category/amount)
- CSV export

### 3. Basic Role Based UI
Implemented in:
- `src/components/Navbar/Navbar.jsx` (role switch)
- `src/store/slices/roleSlice.js`
- `src/App.jsx` (route-level behavior)

Behavior:
- Viewer can browse data
- Admin can add/edit/delete transactions and access settings

### 4. Insights Section
Implemented in:
- `src/pages/Insights/Insights.jsx`
- `src/store/selectors.js` (`selectSummary`, `selectCategorySpending`)

Includes:
- highest spending category
- savings rate and health indicator
- monthly comparison style observations from derived data

### 5. State Management
Implemented in:
- `src/store/index.js`
- `src/store/slices/uiSlice.js`
- `src/store/slices/roleSlice.js`
- `src/store/slices/transactionsSlice.js`
- `src/store/selectors.js`

Managed state:
- transactions data
- filter/sort settings
- selected role
- UI state (theme, sidebar, modal)

### 6. UI/UX Expectations
Implemented:
- responsive layouts across dashboard pages
- dark mode support
- empty-state handling in transactions table (`No transactions found`)
- sticky sidebar/navbar behavior for easier navigation

## Optional Enhancements Implemented
- Dark mode (theme toggle)
- Local storage persistence (role + transactions state)
- CSV export
- Modal-based CRUD interactions

## Project Structure
```text
src/
	components/
		Navbar/
		Sidebar/
		SummaryCard/
		RevenueChart/
		RecentTable/
		TransactionTable/
		TransactionModal/
	pages/
		Dashboard/
		Transactions/
		Insights/
		Settings/
		NotFound/
	store/
		slices/
			uiSlice.js
			roleSlice.js
			transactionsSlice.js
		selectors.js
		index.js
	Data/
		dashboardData.js
		mockTransactions.js
```

## Notes and Assumptions

- This project is intentionally frontend-only for assignment scope.
- Role-based behavior is simulated on the client.
- Data is mock/generated and persisted in browser local storage.
- The focus is on UI architecture, interaction quality, and state handling.

## Future Improvements

- Replace mock data with API integration
- Add pagination/virtualization for very large transaction sets
- Add automated tests (unit/component)
- Improve chart interactivity and advanced filtering
