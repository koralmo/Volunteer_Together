import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes1 } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

const AllNote = ({ search }) => {
  const dispatch = useDispatch();

  const noteList1 = useSelector((state) => state.noteList1);
  const { loading, error, notes } = noteList1;

  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    dispatch(listNotes1());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, userInfo, successDelete, successCreate, successUpdate]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  return (
    <div className="main">
      <MainScreen title={`שלום ${userInfo && userInfo.name}`}>
        <Link to="/createnote">
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            Create new Post
          </Button>
        </Link>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {loading && <Loading />}
        {loadingDelete && <Loading />}
        {notes &&
          notes
            .filter((filteredNote) =>
              filteredNote.category.toLowerCase().includes(search.toLowerCase())
            )
            .reverse()
            .map((note) => (
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Card
                    style={{ margin: 10, background: "none" }}
                    key={note._id}
                  >
                    <Accordion.Header
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                      style={{
                        margin: 10,
                        alignSelf: "center",
                        width: "1200px",
                      }}
                    >
                      <Card.Header style={{ display: "flex" }}>
                        <span
                          style={{
                            color: "black",
                            textDecoration: "none",
                            flex: 1,
                            cursor: "pointer",
                            alignSelf: "center",
                            fontSize: 18,
                            width: "1200px",
                          }}
                        >
                          {" "}
                          {note.title}
                        </span>
                      </Card.Header>
                    </Accordion.Header>
                    <Accordion.Body eventKey="0">
                      <Card.Body>
                        <h4>
                          <Badge variant="success">
                            Category - {note.category}
                          </Badge>
                        </h4>
                        <blockquote className="blockquote mb-0">
                          <p>{note.content}</p>
                          <footer className="blockquote-footer">
                            Created on{" "}
                            <cite title="Source Title">
                              {note.createdAt.substring(0, 10)}
                            </cite>
                          </footer>
                        </blockquote>
                      </Card.Body>
                    </Accordion.Body>
                  </Card>
                </Accordion.Item>
              </Accordion>
            ))}
      </MainScreen>
    </div>
  );
};

export default AllNote;
