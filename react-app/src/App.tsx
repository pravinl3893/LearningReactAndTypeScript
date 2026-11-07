import { useState } from "react";
import Form from "./components/Form";
import ExpenseList from "./components/expense-tracker/components/ExpenseList";
import ExpenseFilter from "./components/expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./components/expense-tracker/components/ExpenseForm";
import categories from "./components/expense-tracker/Categories";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expenses, setExpenses] = useState([
    { id: 1, description: "Groceries", amount: 100, category: "Food" },
    { id: 2, description: "Gas", amount: 50, category: "Food" },
    { id: 3, description: "Gas", amount: 50, category: "Utilities" },
    { id: 4, description: "Gas", amount: 50, category: "Utilities" },
  ]);

  const filteredExpenses = selectedCategory
    ? expenses.filter((expense) => expense.category === selectedCategory)
    : expenses;

  return (
    <div>
      <div className="mb-3">
        <ExpenseForm
          onSubmit={(expense) => {
            setExpenses([...expenses, { ...expense, id: expenses.length + 1 }]);
          }}
        />
      </div>

      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => {
            setSelectedCategory(category);
          }}
        />
      </div>

      <ExpenseList
        expense={filteredExpenses}
        onDelete={(id) => {
          setExpenses(expenses.filter((expense) => expense.id !== id));
        }}
      />
    </div>
  );
}

export default App;
