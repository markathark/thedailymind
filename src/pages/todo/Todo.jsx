import { useState, useEffect, useLayoutEffect } from "react";
import getData from "../../components/getData/getData";
import { v4 as uuidv4 } from "uuid";
import "./todo.css";

const Todo = () => {
  const [toDo, setToDo] = useState(getData("toDo"));
  const [newToDo, setNewToDo] = useState("");
  const [edit, setEdit] = useState("");
  const [editToDo, setEditToDo] = useState("");
  const [error, setError] = useState("");

  const handleToDo = (e) => {
    e.preventDefault();
    if (newToDo === "") {
      setError("Please type a to do description!");
      return;
    } else {
      setToDo([{ id: uuidv4(), desc: newToDo, completed: false }, ...toDo]);
      setNewToDo("");
      setError("");
    }
  };

  const handleDone = (toDoId) => {
    setToDo(
      toDo.map((t) => {
        return toDoId === t.id ? { ...t, completed: !t.completed } : t;
      })
    );
  };

  const makeEdit = (t) => {
    setEdit(t.id);
    setEditToDo(t.desc);
  };

  const handleEdit = (e, toDoId) => {
    e.preventDefault();
    setToDo(
      toDo.map((t) => {
        return toDoId === t.id ? { ...t, desc: editToDo } : t;
      })
    );
    setEditToDo("");
    setEdit("");
  };

  const handleDelete = (toDoId) => {
    setToDo(toDo.filter((t) => t.id !== toDoId));
  };

  useEffect(() => {
    localStorage.setItem(`toDo`, JSON.stringify(toDo));
  }, [toDo]);

  return (
    <div className="page-wrapper">
      <h1>What needs to be done?</h1>
      <form
        onSubmit={(e) => {
          handleToDo(e);
        }}
      >
        <input
          placeholder="Add a to do item"
          value={newToDo}
          className="todo-input"
          onChange={(e) => {
            setNewToDo(e.target.value);
          }}
        />
        <button>add</button>
      </form>
      {error && error}
      <ul>
        {toDo.map((t) => (
          <li key={t.id}>
            {edit === t.id ? (
              <>
                <form onSubmit={(e) => handleEdit(e, t.id)}>
                  <input
                    value={editToDo}
                    onChange={(e) => setEditToDo(e.target.value)}
                  />
                  <button>save</button>
                </form>
              </>
            ) : (
              <>
                <span className={t.completed ? "completed" : ""}>{t.desc}</span>
                <button onClick={() => handleDelete(t.id)}>delete</button>
                <button onClick={() => makeEdit(t)}>edit</button>
                <button onClick={() => handleDone(t.id)}>
                  {t.completed ? "undone" : "done"}
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
