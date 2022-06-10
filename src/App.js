import "./App.css";

import { Routes, Route } from "react-router-dom";
import Main from "./pages/main/Main";
import Nav from "./components/nav/Nav";
import Journal from "./pages/journal/Journal";
import Budget from "./pages/budget/Budget";
import Todo from "./pages/todo/Todo";
import About from "./pages/about/About";
import Notes from "./pages/notes/Notes";
import Page from "./pages/journal/page/Page";
import { useEffect, useState } from "react";
import getData from "./components/getData/getData";

function App() {
  const [mode, setMode] = useState(getData("mode"));

  const changeMode = () => {
    if (mode === "darkMode") {
      setMode("lightMode");
    } else {
      setMode("darkMode");
    }
  };

  useEffect(() => {
    localStorage.setItem(`mode`, JSON.stringify(mode));
  }, [mode]);

  return (
    <Routes>
      <Route path="/" element={<Nav change={changeMode} mode={mode} />}>
        <Route index element={<Main mode={mode} />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:id" element={<Page />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
