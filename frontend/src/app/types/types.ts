// User Types
export interface User {
  id: string;
  auth0Id: string;
  email: string | null;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Expense Types
export interface Expense {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  payment_method: 'cash' | 'debit' | 'credit_card' | 'transfer';
  credit_card_name?: string;
  created_at: string;
  user: User;
}

// Income Types
export interface Income {
  id: string;
  amount: number;
  description: string;
  source: string;
  date: string;
  user: User;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  description?: string;
  user: User;
}

// Credit Card Types
export interface CreditCard {
  id: string;
  name: string;
  card_number: string;
  credit_limit: number;
  current_balance: number;
  due_date: string;
  user: User;
}

// Savings Goal Types
export interface SavingsGoal {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  target_date: string;
  description?: string;
  user: User;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Form Types
export interface CreateExpenseForm {
  amount: number;
  description: string;
  category?: string;
  date: string;
  payment_method: 'cash' | 'debit' | 'credit_card' | 'transfer';
  credit_card_name?: string;
}

export interface UpdateExpenseForm {
  amount?: number;
  description?: string;
  category?: string;
  date?: string;
  payment_method?: 'cash' | 'debit' | 'credit_card' | 'transfer';
  credit_card_name?: string;
}

// Loading and Error States
export interface LoadingState {
  loading: boolean;
  error: string | null;
}

// Chart and Analytics Types
export interface ExpenseByCategory {
  category: string;
  total: number;
  count: number;
}

export interface MonthlyExpense {
  month: string;
  total: number;
  expenses: Expense[];
} 