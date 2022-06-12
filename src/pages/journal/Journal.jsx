import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import getData from "../../components/getData/getData";
import "./journal.css";

const Journal = () => {
  const [journal, setJournal] = useState(
    getData("journal", [
      {
        id: uuidv4(),
        title: "My first journal page",
        date: new Date().toString(),
        page: "Write your thoughts here",
      },
    ])
  );
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState("");
  const [editError, setEditError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title === "") {
      setError("Enter a title!");
    } else {
      const date = new Date().toString();
      const newTitle = {
        id: uuidv4(),
        title: title,
        date: date,
        page: "Write your thoughts here",
      };
      setJournal([newTitle, ...journal]);
      setTitle("");
    }
  };

  const handleEdit = (editjournal) => {
    setEdit(editjournal.id);
    setNewTitle(editjournal.title);
  };

  const handleEditChange = (id) => {
    if (newTitle === "") {
      setEditError("Enter a title!");
    } else {
      const newjournal = journal.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item
      );
      setJournal(newjournal);
      setNewTitle("");
      setEdit("");
    }
  };

  const handleDelete = (deleteId) => {
    setJournal(journal.filter((item) => item.id !== deleteId));
  };

  useEffect(() => {
    localStorage.setItem(`journal`, JSON.stringify(journal));
  }, [journal]);

  return (
    <div className="page-wrapper">
      <h1>Journal</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new page"
        />
        <button>add</button>
      </form>
      {error}
      <ul>
        {journal?.map((journal) => (
          <li key={journal.id}>
            {edit === journal.id ? (
              <>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <span>{editError}</span>
                <button
                  type="button"
                  onClick={(e) => handleEditChange(journal.id)}
                >
                  done
                </button>
              </>
            ) : (
              <>
                <Link to={"/journal/" + journal.id}>
                  {journal.title} <i>{new Date(journal.date).toDateString()}</i>
                </Link>
                <button type="button" onClick={(e) => handleDelete(journal.id)}>
                  delete
                </button>
                <button type="button" onClick={(e) => handleEdit(journal)}>
                  edit name
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Journal;
