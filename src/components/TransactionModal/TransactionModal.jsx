import { useDispatch, useSelector } from "react-redux";
import { X } from "lucide-react";
import { closeModal, openModal } from "../../store/slices/uiSlice";
import {
  addTransaction,
  updateTransaction,
} from "../../store/slices/transactionsSlice";
import { selectCategoriesForType } from "../../store/selectors";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { nanoid } from "nanoid";

const TYPES = ["income", "expense"];

export default function TransactionModal() {
  const dispatch = useDispatch();
  const { modalOpen, editingTransaction } = useSelector((s) => s.ui);
  const [form, setForm] = useState({
    type: "expense",
    category: "Food & Dining",
    amount: "",
    description: "",
    date: format(new Date(), "yyyy-MM-dd"),
    note: "",
  })
  const [errors, setErrors] = useState({});

  const categories = useSelector((state) =>selectCategoriesForType(state, form.type) )

  useEffect(() => {
    if (editingTransaction) {
      setForm(editingTransaction);
    } else {
      setForm({
        type: "expense",
        category: "Food & Dining",
        amount: "",
        description: "",
        date: format(new Date(), "yyyy-MM-dd"),
        note: "",
      });
    }
    setErrors({});
  }, [editingTransaction, modalOpen]);

  const validate = () => {
    const newErrors = {};
    if (!form.amount || parseFloat(form.amount) <= 0)
      newErrors.amount = "Amount must be greater than 0";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    if (!form.date) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editingTransaction) {
      dispatch(
        updateTransaction({
          ...form,
          amount: parseFloat(form.amount),
        })
      );
    } else {
      dispatch(
        addTransaction({
          ...form,
          id: nanoid(),
          amount: parseFloat(form.amount),
        })
      );
    }
    dispatch(closeModal());
  };

  if (!modalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-96 rounded-lg border border-slate-200 bg-white p-6 shadow-lg dark:border-zinc-700 dark:bg-black">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-100">
            {editingTransaction ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button
            onClick={() => dispatch(closeModal())}
            className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-zinc-950"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">
              Type
            </label>
            <select
              value={form.type}
              onChange={(e) => {
                setForm({ ...form, type: e.target.value, category: "" });
              }}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className={`mt-1 w-full rounded-lg border px-3 py-2 dark:bg-zinc-950 dark:text-zinc-100 ${
                errors.amount
                  ? "border-red-500"
                  : "border-slate-300 dark:border-zinc-600"
              }`}
              placeholder="0.00"
            />
            {errors.amount && (
              <p className="mt-1 text-xs text-red-500">{errors.amount}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">
              Description
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className={`mt-1 w-full rounded-lg border px-3 py-2 dark:bg-zinc-950 dark:text-zinc-100 ${
                errors.description
                  ? "border-red-500"
                  : "border-slate-300 dark:border-zinc-600"
              }`}
              placeholder="e.g., Grocery shopping"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={`mt-1 w-full rounded-lg border px-3 py-2 dark:bg-zinc-950 dark:text-zinc-100 ${
                errors.date
                  ? "border-red-500"
                  : "border-slate-300 dark:border-zinc-600"
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-xs text-red-500">{errors.date}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-zinc-300">
              Note (Optional)
            </label>
            <textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-950 dark:text-zinc-100"
              placeholder="Add a note..."
              rows="2"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={() => dispatch(closeModal())}
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-950"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {editingTransaction ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
