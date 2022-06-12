import Draggable from "react-draggable";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./notes.css";
import getData from "../../components/getData/getData";

const Notes = () => {
  const [positions, setPositions] = useState(
    getData("notesPositions", { "first-id": { x: 0, y: -66 } })
  );
  const [notes, setNotes] = useState(
    getData("previousNotes", [
      ["first-id", "My first post it! Click and drag me around", true],
    ])
  );
  const [newNote, setNewNote] = useState("");
  let nodeRef = useRef(null);
  const createNote = (event) => {
    event.preventDefault();
    const itemId = uuidv4();
    if (notes === null) {
      setNotes([[itemId, newNote, true]]);
    } else {
      setNotes([...notes, [itemId, newNote, true]]);
    }
    setNewNote("");
  };
  const handleDelete = (item) => {
    deletePositions(item[0]);
    const newNotes = notes.map((e) =>
      e !== item ? e : [item[0], item[1], false]
    );
    setNotes(newNotes);
  };

  const deletePositions = (id) => {
    const newPositions = positions;
    delete newPositions[id];
    setPositions(newPositions);
    localStorage.setItem(`notesPositions`, JSON.stringify(newPositions));
  };
  const updateValue = (id, e) => {
    const dummyNotes = notes.map((n) => (n[0] !== id ? n : [id, e, true]));
    setNotes(dummyNotes);
  };

  const handleStop = (e, data) => {
    let dummyPositions = { ...positions };
    const itemId = e.target.id;
    dummyPositions[itemId] = {};
    dummyPositions[itemId]["x"] = data.x;
    dummyPositions[itemId]["y"] = data.y;
    setPositions(dummyPositions);
  };

  useEffect(() => {
    localStorage.setItem(`notesPositions`, JSON.stringify(positions));
  }, [positions]);

  useEffect(() => {
    var savedNotes = null;
    if (notes) {
      savedNotes = notes.filter((e) => e[2] !== false);
    }
    localStorage.setItem(`previousNotes`, JSON.stringify(savedNotes));
  }, [notes]);

  return (
    <div className="notes-wrapper">
      {notes?.map((item) => (
        <Draggable
          defaultPosition={
            positions === null
              ? { x: 0, y: 0 }
              : !positions[item[0]]
              ? { x: 0, y: 0 }
              : { x: positions[item[0]].x, y: positions[item[0]].y }
          }
          position={null}
          key={item[0]}
          nodeRef={nodeRef}
          onStop={handleStop}
          bounds="body"
        >
          <div
            ref={nodeRef}
            id={item[0]}
            className={
              item[2] ? "main-note-wrapper" : "main-note-wrapper disabled"
            }
            title="drag and place this anywhere!"
          >
            <span
              title="delete note"
              ref={nodeRef}
              id={item[0]}
              className="close-note"
              onClick={(e) => {
                handleDelete(item);
              }}
            >
              ✕
            </span>
            <textarea
              ref={nodeRef}
              spellCheck="false"
              className="main-note"
              id={item[0]}
              value={item[1]}
              onChange={(e) => updateValue(item[0], e.target.value)}
            ></textarea>
          </div>
        </Draggable>
      ))}
      <div className="page-wrapper">
        <h1>Notes</h1>
        <form onSubmit={createNote}>
          <input
            placeholder="Add a draggable post it"
            type="text"
            id="textnotes"
            onChange={(e) => setNewNote(e.target.value)}
          />
          <button> add </button>
        </form>
      </div>
    </div>
  );
};

export default Notes;
