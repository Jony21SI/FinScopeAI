import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="flex items-center justify-between text-feijoa-800 font-bold text-2xl">
        Add Expense
        <IconButton onClick={onClose} aria-label="close" size="large">
          <CloseIcon className="text-feijoa-800" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form
          id="add-expense-form"
          onSubmit={onSubmit}
          className="flex flex-col gap-4 mt-2"
        >
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
            <Button
              type="button"
              variant="outlined"
              color="success"
              className="mt-2 !border-feijoa-800 !text-feijoa-800 !bg-feijoa-100 !rounded-full !font-semibold !shadow hover:!bg-feijoa-200"
              style={{ marginTop: 8 }}
              // No functionality yet
            >
              + Add Credit Card
            </Button>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          form="add-expense-form"
          variant="contained"
          style={{
            backgroundColor: "#4CAF50",
            color: "#fff",
            borderRadius: 9999,
            fontWeight: 600,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Expense"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpenseModal;
