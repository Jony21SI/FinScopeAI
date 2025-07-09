'use client';
import { useState, useEffect } from 'react';
import { Expense } from '@/app/types/types';
import { SessionProps } from '@/app/types/sessionTypes';

const ExpenseDisplay = ({ session }: SessionProps) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const accessToken = session?.accessToken;
  
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('http://localhost:3001/expenses/a21538ba-add0-4b24-b597-683fc15e1e57', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        const data = await response.json();
        setExpenses(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p>Error: {error}</p>;
  if (expenses.length === 0) return <p>No expenses found</p>;

  return (
    <div className="flex flex-col items-center h-screen pt-10">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="text-lg">Welcome to your dashboard</p>
      <div className="flex flex-col items-center justify-center pt-10">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold">Expenses</h2>
          <p className="text-lg">
            Here are your expenses for the month of July
          </p>
          <div className="flex flex-col items-center justify-center">
            {expenses.map((expense) => (
              <div key={expense.id} className="border p-4 mb-4 rounded w-full max-w-md">
                <h3 className="text-xl font-bold">{expense.description}</h3>
                <p className="text-lg">Amount: ${expense.amount}</p>
                <p className="text-lg">Category: {expense.category}</p>
                <p className="text-lg">Date: {new Date(expense.date).toLocaleDateString()}</p>
                <p className="text-lg">Payment Method: {expense.payment_method}</p>
                {expense.credit_card_name && (
                  <p className="text-lg">Credit Card: {expense.credit_card_name}</p>
                )}
                <p className="text-sm text-gray-500">
                  Created: {new Date(expense.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDisplay;