"use client";
import { useState, useEffect } from "react";
import { Expense } from "@/app/types/types";
import { SessionProps } from "@/app/types/sessionTypes";
import ExpenseTable from "./ExpenseTable";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ExpenseDisplay = ({ session }: SessionProps) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const accessToken = session?.accessToken;

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        // Get user id from session
        const USER_ID = session?.user?.auth0Id;
        if (!USER_ID) {
          setError("No user ID found in session");
          setLoading(false);
          return;
        }
        const response = await fetch(
          `http://localhost:3001/expenses/user/${USER_ID}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }
        const data = await response.json();
        setExpenses(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    const fetchTotal = async () => {
      try {
        const response = await fetch("http://localhost:3001/expenses/total", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch total expenses");
        const totalValue = await response.json();
        setTotal(totalValue);
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchExpenses();
    fetchTotal();
  }, []);

  if (loading) return <p>Loading expenses...</p>;
  if (error) return <p>Error: {error}</p>;
  if (expenses.length === 0) return <p>No expenses found</p>;

  return (
    <div className="flex flex-col items-center h-screen pt-10">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="text-lg">Welcome to your dashboard</p>
      {total !== null && (
        <div className="text-2xl font-semibold text-feijoa-800 mb-4">
          Total Expenses: ${total}
        </div>
      )}
      <div className="flex flex-col items-center justify-center pt-10 w-full">
        <div className="flex flex-col items-center justify-center w-full px-4 md:px-12">
          <h2 className="text-2xl font-bold">Expenses</h2>
          <p className="text-lg">
            Here are your expenses for the month of July
          </p>
          <div className="flex flex-row gap-10 my-4">
            <button className="relative text-base uppercase no-underline py-3 px-8 cursor-pointer rounded-full transition-all border-none font-medium text-feijoa-50 bg-feijoa-800 shadow hover:-translate-y-1 hover:shadow-lg active:-translate-y-0.5 active:shadow-md focus:outline-none focus:ring-2 focus:ring-feijoa-700 after:content-[''] after:inline-block after:h-full after:w-full after:rounded-full after:absolute after:top-0 after:left-0 after:-z-10 after:bg-feijoa-800 after:transition-all after:duration-400 hover:after:scale-x-115 hover:after:scale-y-115 hover:after:opacity-0 flex items-center gap-3">
              <AddCircleIcon className="text-feijoa-50" />
              Add Expense
            </button>
            <button className="relative text-base uppercase no-underline py-3 px-8 cursor-pointer rounded-full transition-all border-none font-medium text-feijoa-50 bg-feijoa-700 shadow hover:-translate-y-1 hover:shadow-lg active:-translate-y-0.5 active:shadow-md focus:outline-none focus:ring-2 focus:ring-feijoa-800 after:content-[''] after:inline-block after:h-full after:w-full after:rounded-full after:absolute after:top-0 after:left-0 after:-z-10 after:bg-feijoa-700 after:transition-all after:duration-400 hover:after:scale-x-115 hover:after:scale-y-115 hover:after:opacity-0 flex items-center gap-3">
              <EditIcon className="text-feijoa-50" />
              Edit Expense
            </button>
            <button className="relative text-base uppercase no-underline py-3 px-8 cursor-pointer rounded-full transition-all border-none font-medium text-feijoa-50 bg-red-600 shadow hover:-translate-y-1 hover:shadow-lg active:-translate-y-0.5 active:shadow-md focus:outline-none focus:ring-2 focus:ring-red-800 after:content-[''] after:inline-block after:h-full after:w-full after:rounded-full after:absolute after:top-0 after:left-0 after:-z-10 after:bg-red-600 after:transition-all after:duration-400 hover:after:scale-x-115 hover:after:scale-y-115 hover:after:opacity-0 flex items-center gap-3">
              <DeleteIcon className="text-feijoa-50" />
              Delete Expense
            </button>
          </div>
          <div className="w-full mt-4 ">
            <ExpenseTable expenses={expenses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDisplay;
