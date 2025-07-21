import React from "react";

interface AddExpenseModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  form: {
    amount: string;
    description: string;
    payment_method: string;
    credit_card_name: string;
  };
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  submitting: boolean;
  paymentMethods: string[];
  creditCardOptions: string[];
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  open,
  onClose,
  onSubmit,
  form,
  onFormChange,
  submitting,
  paymentMethods,
  creditCardOptions,
}) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-4 text-2xl text-feijoa-800 hover:text-feijoa-700 font-bold hover:cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-feijoa-800">Add Expense</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={onFormChange}
              required
              min="0"
              step="0.01"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-feijoa-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={onFormChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-feijoa-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Payment Method
            </label>
            <select
              name="payment_method"
              value={form.payment_method}
              onChange={onFormChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-feijoa-800"
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method
                    .replace("_", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Credit Card Name
            </label>
            <select
              name="credit_card_name"
              value={form.credit_card_name}
              onChange={onFormChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-feijoa-800"
            >
              {creditCardOptions.map((card) => (
                <option key={card} value={card}>
                  {card}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="mt-2 bg-feijoa-100 text-feijoa-800 py-1 px-4 rounded-full font-semibold shadow hover:bg-feijoa-200 transition-all border border-feijoa-800 hover:cursor-pointer"
              // No functionality yet
            >
              + Add Credit Card
            </button>
          </div>
          <button
            type="submit"
            className="mt-2 bg-feijoa-800 text-feijoa-50 py-2 px-6 rounded-full font-semibold shadow hover:bg-feijoa-700 transition-all disabled:opacity-60 hover:cursor-pointer"
            disabled={submitting}
          >
            {submitting ? "Adding..." : "Add Expense"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
