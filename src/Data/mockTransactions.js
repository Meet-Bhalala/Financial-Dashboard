import { format, subDays } from 'date-fns';
import { nanoid } from 'nanoid';

const CATEGORIES = {
  income: [
    'Salary',
    'Freelance',
    'Investment',
    'Bonus',
    'Rental Income',
  ],
  expense: [
    'Food & Dining',
    'Shopping',
    'Transportation',
    'Entertainment',
    'Healthcare',
    'Utilities',
    'Education',
    'Travel',
    'Subscriptions',
  ],
};

const incomeTemplates = [
  {
    description: 'Monthly Salary',
    category: 'Salary',
    minAmt: 4500,
    maxAmt: 6000,
  },
  {
    description: 'Freelance Project',
    category: 'Freelance',
    minAmt: 300,
    maxAmt: 1500,
  },
  {
    description: 'Dividend Payment',
    category: 'Investment',
    minAmt: 100,
    maxAmt: 500,
  },
];

const expenseTemplates = [
  {
    description: 'Grocery Store',
    category: 'Food & Dining',
    minAmt: 40,
    maxAmt: 180,
  },
  {
    description: 'Restaurant Dinner',
    category: 'Food & Dining',
    minAmt: 30,
    maxAmt: 120,
  },
  {
    description: 'Amazon Purchase',
    category: 'Shopping',
    minAmt: 25,
    maxAmt: 300,
  },
  {
    description: 'Uber Ride',
    category: 'Transportation',
    minAmt: 12,
    maxAmt: 45,
  },
  {
    description: 'Movie Tickets',
    category: 'Entertainment',
    minAmt: 20,
    maxAmt: 60,
  },
  {
    description: 'Gym Membership',
    category: 'Healthcare',
    minAmt: 30,
    maxAmt: 80,
  },
  {
    description: 'Electricity Bill',
    category: 'Utilities',
    minAmt: 60,
    maxAmt: 150,
  },
];

const rand = (min, max) => Math.round((Math.random() * (max - min) + min) * 100) / 100;

export const generateMockTransactions = () => {
  const now = new Date();
  const transactions = [];

  for (let i = 0; i < 90; i++) {
    const date = subDays(now, i);
    const numTx = Math.floor(Math.random() * 4) + 1;

    for (let j = 0; j < numTx; j++) {
      const isIncome = Math.random() < 0.22;
      const templates = isIncome ? incomeTemplates : expenseTemplates;
      const template = templates[Math.floor(Math.random() * templates.length)];

      transactions.push({
        id: nanoid(),
        description: template.description,
        category: template.category,
        amount: rand(template.minAmt, template.maxAmt),
        type: isIncome ? 'income' : 'expense',
        date: format(date, 'yyyy-MM-dd'),
        note: '',
      });
    }
    }
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};
