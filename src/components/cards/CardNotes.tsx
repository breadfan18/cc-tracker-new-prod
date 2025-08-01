import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import {
  saveCardNoteToFirebase,
  deleteCardNoteFromFirebase,
} from "../../redux/actions/cardsActions";
import { Spinner } from "../common/Spinner";
import { formatDate } from "../../helpers";
import {
  APP_COLOR_LIGHT_BLUE,
  DELETE_COLOR_RED,
  NEW_NOTE,
} from "../../constants";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import EmptyList from "../common/EmptyList";
import { useUser } from "reactfire";
import { useSelector } from "react-redux";
import { MainReduxState } from "../../types/redux";
import { CardNote } from "../../types/cards-types";

type CardNotesProps = {
  cardId: string;
  cardNotes: CardNote[];
};
function CardNotes({ cardId, cardNotes }: CardNotesProps) {
  const theme = useSelector((state: MainReduxState) => state.theme);
  const loading = useSelector(
    (state: MainReduxState) => state.apiCallsInProgress > 0
  );
  const dispatch = useDispatch();
  const [note, setNote] = useState(NEW_NOTE);
  const { data: user } = useUser();

  function handleChange(e) {
    setNote({
      note: e.target.value,
      date: new Date().toISOString().split("T")[0],
    });
  }

  function handleSave(e) {
    e.preventDefault();
    dispatch(saveCardNoteToFirebase(note, cardId, user?.uid));
    toast.success("Note Added");
    setNote(NEW_NOTE);
  }

  function handleDelete(note) {
    dispatch(deleteCardNoteFromFirebase(note, cardId, user?.uid));
    toast.success("Note Deleted");
  }

  function handleSaveOnEnter(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      dispatch(saveCardNoteToFirebase(note, cardId, user?.uid));
      toast.success("Note Added");
      setNote(NEW_NOTE);
    }
  }

  return loading ? (
    <Spinner />
  ) : (
    <Card
      className={`text-center ${theme === "dark" && "bg-dark"}`}
      style={{
        boxShadow:
          theme === "dark" ? `0 0 3px rgb(168, 166, 166)` : `2px 0 10px gray`,
      }}
    >
      <Card.Header className="cardHeaders">Card Notes</Card.Header>
      <Card.Body style={{ textAlign: "left" }}>
        {cardNotes.length === 0 ? (
          <EmptyList dataType={"note"} />
        ) : (
          <Table
            size="sm"
            variant={theme === "dark" ? "dark" : ""}
            style={{ fontSize: "clamp(12px, 3vw, 1rem)" }}
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>Note</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cardNotes.map((note) => (
                <tr key={note.id}>
                  <td style={{ minWidth: "100px" }}>{formatDate(note.date)}</td>
                  <td style={{ maxWidth: "500px" }}>{note.note}</td>
                  <td style={{ textAlign: "right" }}>
                    <AiFillDelete
                      style={{
                        color: DELETE_COLOR_RED,
                        fontSize: "1.5rem",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(note)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
      <Card.Footer
        className="text-muted notesFooter"
        style={{
          padding: "10px",
          borderTop: theme === "dark" ? "1px solid #4e5359" : "",
          backgroundColor: theme === "light" ? APP_COLOR_LIGHT_BLUE : "",
        }}
      >
        <Form.Control
          as="textarea"
          rows={2}
          onChange={handleChange}
          value={note.note}
          onKeyDown={handleSaveOnEnter}
          style={{
            backgroundColor: theme === "dark" ? "black" : "#fff",
            color: theme === "dark" ? "white" : "black",
          }}
        />
        <Button className="addButton" onClick={(e) => handleSave(e)}>
          Add
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default CardNotes;
