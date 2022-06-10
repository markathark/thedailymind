import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import getData from "../../../components/getData/getData";
import "./page.css";

const Page = () => {
  const { id } = useParams();
  const [journal, setJournal] = useState(getData("journal"));
  const [page, setPage] = useState(
    journal.find((j) => {
      return j.id === id;
    })
  );
  const [content, setContent] = useState(page.page);

  useEffect(() => {
    const newPage = { ...page, page: content };
    const newJournal = journal.map((j) => (j.id === id ? newPage : j));
    console.log(newJournal);
    localStorage.setItem(`journal`, JSON.stringify(newJournal));
  }, [content]);

  return (
    <div className="page-wrapper">
      <h1>{page.title}</h1>
      <br />
      <textarea
        className="page-content"
        value={content}
        autoFocus
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};

export default Page;
