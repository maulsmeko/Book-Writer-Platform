import Card from "react-bootstrap/Card";
import { ReactComponent as EditIcon } from "../../assets/images/edit.svg";
import { ReactComponent as ViewIcon } from "../../assets/images/eye.svg";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BookCard = () => {
  const [booksList, setBooksList] = useState([]);

  const navigate = useNavigate();

  const auth = JSON.parse(localStorage.getItem("userData"));

  const isCollabId = booksList.some((book) =>
    book.collaborators.some((collab) => collab.value === auth?.user?.id)
  );
  const getAllBooks = async () => {
    try {
      const response = await fetch("http://localhost:9000/books", {
        method: "GET",
        headers: {
          Authorization: "token",
        },
      });
      const data = await response.json();
      if (data.length > 0) {
        setBooksList(data);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  const booksLists = booksList.map((book) => book);

  useEffect(() => {
    getAllBooks();
  }, []);

  console.log(typeof booksLists.author, "-");

  return (
    <Row xs={1} md={2} lg={3} xl={4} className="g-4">
      {" "}
      {/* Set number of columns per row based on screen size */}
      {booksList.length === 0 && <Col>No Books Found</Col>}
      {booksList.map((book, index) => (
        <Col key={index}>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Category: {book.category}
              </Card.Subtitle>
              <Card.Text>{book.description}</Card.Text>
              <div className="d-flex justify-content-between align-items-center">
                {auth?.user?.id === book.author || isCollabId ? (
                  <EditIcon
                    className="mr-2"
                    onClick={() => navigate(`/edit-book/edit/${book.id}`)}
                  />
                ) : null}
                <ViewIcon
                  onClick={() => navigate(`/edit-book/view/${book.id}`)}
                />{" "}
                {/* View Icon */}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BookCard;
