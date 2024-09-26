import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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

function CardNotes({
  cardId,
  cardNotes,
  saveCardNoteToFirebase,
  deleteCardNoteFromFirebase,
  loading,
}) {
  const theme = useSelector((state) => state.theme);
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
    saveCardNoteToFirebase(note, cardId, user?.uid);
    toast.success("Note Added");
    setNote(NEW_NOTE);
  }

  function handleDelete(note) {
    deleteCardNoteFromFirebase(note, cardId, user?.uid);
    toast.success("Note Deleted");
  }

  function handleSaveOnEnter(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      saveCardNoteToFirebase(note, cardId, user?.uid);
      toast.success("Note Added");
      setNote(NEW_NOTE);
    }
  }

  return loading ? (
    <Spinner />
  ) : (
    <Card
      className={`text-center ${theme === "dark" && "bg-dark"}`}
      style={{ boxShadow: `0 0 3px gray` }}
    >
      <Card.Header className="cardHeaders">Card Notes</Card.Header>
      <Card.Body style={{ textAlign: "left" }}>
        {cardNotes.length === 0 ? (
          <EmptyList dataType={"note"} />
        ) : (
          <Table size="sm" variant={theme === "dark" && "dark"}>
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
                  <td style={{ minWidth: "80px" }}>{formatDate(note.date)}</td>
                  <td>{note.note}</td>
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
          borderTop: theme === "dark" && "1px solid #4e5359",
          backgroundColor: theme === "light" && APP_COLOR_LIGHT_BLUE,
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

CardNotes.propTypes = {
  loading: PropTypes.bool.isRequired,
  saveCardNoteToFirebase: PropTypes.func.isRequired,
  deleteCardNoteFromFirebase: PropTypes.func.isRequired,
  cardId: PropTypes.object.isRequired,
  cardNotes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  saveCardNoteToFirebase,
  deleteCardNoteFromFirebase,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardNotes);
