import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import getData from "../../components/getData/getData";
import "./journal.css";

const Journal = () => {
  const [journal, setJournal] = useState(getData("journal"));
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const date = new Date().toString();
    const newTitle = {
      id: uuidv4(),
      title: title,
      date: date,
      page: "",
    };
    setJournal([newTitle, ...journal]);
    setTitle("");
  };

  const handleEdit = (editjournal) => {
    setEdit(editjournal.id);
    setNewTitle(editjournal.title);
  };

  const handleEditChange = (id) => {
    const newjournal = journal.map((item) =>
      item.id === id ? { ...item, title: newTitle } : item
    );
    setJournal(newjournal);
    setNewTitle("");
    setEdit("");
  };

  const handleDelete = (deleteId) => {
    setJournal(journal.filter((item) => item.id !== deleteId));
  };

  useEffect(() => {
    localStorage.setItem(`journal`, JSON.stringify(journal));
  }, [journal]);

  return (
    <div className="page-wrapper">
      <h1>Journals</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new page"
        />
        <button>add</button>
      </form>
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
                <button
                  type="button"
                  onClick={(e) => handleEditChange(journal.id)}
                >
                  done
                </button>
              </>
            ) : (
              <Link to={"/journal/" + journal.id}>
                {journal.title} {new Date(journal.date).toDateString()}
              </Link>
            )}{" "}
            {error}
            <button type="button" onClick={(e) => handleDelete(journal.id)}>
              delete
            </button>
            <button type="button" onClick={(e) => handleEdit(journal)}>
              edit name
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Journal;
