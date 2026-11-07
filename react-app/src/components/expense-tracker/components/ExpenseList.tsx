import React from "react";
import ExpenseFilter from "./ExpenseFilter";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface Props {
  expense: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseList = ({ expense, onDelete }: Props) => {
  if (expense.length === 0) {
    return <p className="text-center">No expenses found.</p>;
  }

  return (
    <table className="table table-bordered">
      <thead>
        <th>Description</th>
        <th>Amount</th>
        <th>Category</th>
        <th></th>
      </thead>
      <tbody>
        {expense.map((exp) => (
          <tr key={exp.id}>
            <td>{exp.description}</td>
            <td>${exp.amount.toFixed(2)}</td>
            <td>{exp.category}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDelete(exp.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Total</td>
          <td>
            ${expense.reduce((acc, exp) => acc + exp.amount, 0).toFixed(2)}
          </td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ExpenseList;
