import { Expense } from "@/app/types/types";

interface ExpenseTableProps {
  expenses: Expense[];
}

const ExpenseTable = ({ expenses }: ExpenseTableProps) => (
  <table className="min-w-full border border-gray-300 rounded-lg table-auto w-full ">
    <thead className="bg-feijoa-100">
      <tr>
        <th className="px-2 py-2 border text-xs md:text-base">Description</th>
        <th className="px-2 py-2 border text-xs md:text-base">Amount</th>
        <th className="px-2 py-2 border text-xs md:text-base">Main Category</th>
        <th className="px-2 py-2 border text-xs md:text-base">Subcategory</th>
        <th className="px-2 py-2 border text-xs md:text-base">Date</th>
        <th className="px-2 py-2 border text-xs md:text-base">
          Payment Method
        </th>
        <th className="px-2 py-2 border text-xs md:text-base">Credit Card</th>
        <th className="px-2 py-2 border text-xs md:text-base">Created</th>
      </tr>
    </thead>
    <tbody>
      {expenses.map(
        ({
          id,
          description,
          amount,
          main_category,
          subcategory,
          date,
          payment_method,
          credit_card_name,
          created_at,
        }) => (
          <tr key={id} className="text-center border-t">
            <td className="px-2 py-2 border break-words text-xs md:text-base">
              {description}
            </td>
            <td className="px-2 py-2 border text-xs md:text-base">
              ${Number(amount).toFixed(2)}
            </td>
            <td className="px-2 py-2 border break-words text-xs md:text-base">
              {main_category}
            </td>
            <td className="px-2 py-2 border break-words text-xs md:text-base">
              {subcategory}
            </td>
            <td className="px-2 py-2 border text-xs md:text-base">
              {new Date(date).toLocaleDateString()}
            </td>
            <td className="px-2 py-2 border text-xs md:text-base">
              {payment_method}
            </td>
            <td className="px-2 py-2 border break-words text-xs md:text-base">
              {credit_card_name || "-"}
            </td>
            <td className="px-2 py-2 border text-xs md:text-xs">
              {new Date(created_at).toLocaleString()}
            </td>
          </tr>
        )
      )}
    </tbody>
  </table>
);

export default ExpenseTable;
