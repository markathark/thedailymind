import "./budget.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import getData from "../../components/getData/getData";

const Budget = () => {
  const [remaining, setRemaining] = useState(0);
  const [budget, setBudget] = useState(getData("budget"));
  const [totalExpense, setTotalExpense] = useState(
    getData("totalExpense", true)
  );
  const [expenses, setExpenses] = useState(getData("expenses"));
  const [totalBudget, setTotalBudget] = useState(getData("totalBudget", true));
  const [budgetError, setBudgetError] = useState("");
  const [expenseError, setExpenseError] = useState("");
  const [edit, setEdit] = useState("");

  const [editBudget, setEditBudget] = useState(0);
  const [editBudgetName, setEditBudgetName] = useState("");
  const [editExpense, setEditExpense] = useState(0);
  const [editExpenseName, setEditExpenseName] = useState("");

  const [newBudget, setNewBudget] = useState(0);
  const [newBudgetName, setNewBudgetName] = useState("");
  const [newExpense, setNewExpense] = useState(0);
  const [newExpenseName, setNewExpenseName] = useState("");

  const handleBudget = (e) => {
    e.preventDefault();
    if (newBudget === 0 || newBudget === "") {
      setBudgetError("Enter a budget total!");
      return null;
    } else if (newBudgetName === "") {
      setBudgetError("Please name your budget!");
      return null;
    } else {
      setBudget([
        { budget: newBudget, name: newBudgetName, id: uuidv4() },
        ...budget,
      ]);
      setTotalBudget(parseInt(totalBudget) + parseInt(newBudget));
      setNewBudget(0);
      setNewBudgetName("");
      setBudgetError("");
    }
  };

  const handleExpense = (e) => {
    e.preventDefault();
    if (newExpense === 0 || newExpense === "") {
      setExpenseError("Enter a expense total!");
      return null;
    } else if (newExpenseName === "") {
      setExpenseError("Please name your expense!");
      return null;
    } else {
      setExpenses([
        { name: newExpenseName, expense: newExpense, id: uuidv4() },
        ...expenses,
      ]);
      setTotalExpense(parseInt(totalExpense) + parseInt(newExpense));
      setNewExpense(0);
      setNewExpenseName("");
      setBudgetError("");
    }
  };

  const handleEditBudget = (b) => {
    setEdit(b.id);
    setEditBudget(b.budget);
    setEditBudgetName(b.name);
  };

  const saveBudgetEdit = (e, oldBudget) => {
    e.preventDefault();
    setTotalBudget(totalBudget - oldBudget.budget + parseInt(editBudget));
    setBudget(
      budget.map((b) => {
        if (b.id === oldBudget.id) {
          return { ...b, name: editBudgetName, budget: editBudget };
        } else {
          return b;
        }
      })
    );
    setEdit("");
  };

  const handleEditExpense = (exp) => {
    setEdit(exp.id);
    setEditExpense(exp.expense);
    setEditExpenseName(exp.name);
  };

  const saveExpenseEdit = (e, oldExpense) => {
    e.preventDefault();
    setTotalExpense(totalExpense - oldExpense.expense + parseInt(editExpense));
    setExpenses(
      expenses.map((b) => {
        if (b.id === oldExpense.id) {
          return { ...b, name: editExpenseName, expense: editExpense };
        } else {
          return b;
        }
      })
    );
    setEdit("");
  };

  const handleDeleteBudget = (budgetDelete) => {
    setBudget(budget.filter((bud) => bud.id !== budgetDelete.id));
    setTotalBudget(totalBudget - budgetDelete.budget);
  };

  const handleDeleteExpense = (expenseDelete) => {
    setExpenses(expenses.filter((exp) => exp.id !== expenseDelete.id));
    setTotalExpense(totalExpense - expenseDelete.expense);
  };

  useEffect(() => {
    setRemaining(totalBudget - totalExpense);
  }, [totalExpense, totalBudget]);

  useEffect(() => {
    localStorage.setItem(`expenses`, JSON.stringify(expenses));
    localStorage.setItem(`totalExpense`, JSON.stringify(totalExpense));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(`budget`, JSON.stringify(budget));
    localStorage.setItem(`totalBudget`, JSON.stringify(totalBudget));
  }, [budget]);

  return (
    <div className="page-wrapper">
      <h1>Budget</h1>
      <div className="budget-tracker">
        You have ${remaining} remaining. You spent ${totalExpense} of your $
        {totalBudget} budget!
      </div>

      <div className="budget-edit">
        <div>
          Budget:
          <ul>
            {budget.map((b) => (
              <li key={b.id}>
                {edit === b.id ? (
                  <form onSubmit={(e) => saveBudgetEdit(e, b)}>
                    <input
                      value={editBudget}
                      onChange={(e) => setEditBudget(e.target.value)}
                      type="number"
                    ></input>
                    <input
                      value={editBudgetName}
                      onChange={(e) => setEditBudgetName(e.target.value)}
                    ></input>
                    <button>save</button>
                  </form>
                ) : (
                  <>
                    ${b.budget} - {b.name}
                    <button onClick={() => handleEditBudget(b)}>edit</button>
                    <button onClick={() => handleDeleteBudget(b)}>
                      delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <form onSubmit={(e) => handleBudget(e)} className="budget-form">
            <input
              placeholder="Budget"
              type="number"
              onChange={(e) => setNewBudget(e.target.value)}
              value={newBudget}
            />
            <input
              placeholder="name"
              onChange={(e) => setNewBudgetName(e.target.value)}
              value={newBudgetName}
            />
            <button>add</button>
          </form>
          {budgetError}
        </div>
        <div>
          Expenses:
          <ul>
            {expenses.map((exp) => (
              <li key={exp.id}>
                {edit === exp.id ? (
                  <form onSubmit={(e) => saveExpenseEdit(e, exp)}>
                    <input
                      value={editExpense}
                      onChange={(e) => setEditExpense(e.target.value)}
                      type="number"
                    ></input>
                    <input
                      value={editExpenseName}
                      onChange={(e) => setEditExpenseName(e.target.value)}
                    ></input>
                    <button>save</button>
                  </form>
                ) : (
                  <>
                    ${exp.expense} - {exp.name}
                    <button onClick={() => handleEditExpense(exp)}>
                      edit
                    </button>{" "}
                    <button onClick={() => handleDeleteExpense(exp)}>
                      delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
          <form onSubmit={(e) => handleExpense(e)} className="expense-form">
            <input
              placeholder="Expense"
              type="number"
              onChange={(e) => setNewExpense(e.target.value)}
              value={newExpense}
            />
            <input
              placeholder="name"
              onChange={(e) => setNewExpenseName(e.target.value)}
              value={newExpenseName}
            />
            <button>add</button>
          </form>
          {expenseError}
        </div>
      </div>
    </div>
  );
};

export default Budget;
