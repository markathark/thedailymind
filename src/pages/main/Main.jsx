import "./main.css";
import getData from "../../components/getData/getData";
import { useEffect, useState } from "react";

const Main = (props) => {
  const [focus, setFocus] = useState(
    getData("mainFocus", "Insert your main focus here!")
  );
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    localStorage.setItem(`mainFocus`, JSON.stringify(focus));
  }, [focus]);

  return (
    <div className="page-wrapper">
      <div className="main-content">
        <h1>Main Focus</h1>

        {edit ? (
          <>
            <input
              className="main-focus"
              value={focus}
              spellCheck="false"
              onChange={(e) => setFocus(e.target.value)}
              autoFocus
            />
            <button onClick={(e) => setEdit(false)}> save</button>
          </>
        ) : (
          <>
            <h2>{focus}</h2>
            <button onClick={(e) => setEdit(true)} className="main-edit">
              click here to edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
