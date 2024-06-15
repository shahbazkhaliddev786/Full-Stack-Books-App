import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BookDetail = () => {
  const { bookId } = useParams();

  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      try {
          const response = await fetch(`http://localhost:4000/api/books/${bookId}`);
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setBook(data.book);
      } catch (err) {
          setError(err.message);
      }
  };

  fetchBook();
  }, [bookId]);
  return (
    <div>
      <div className="container">
        <div className="card row" style={{ textAlign: "center", marginTop: '4rem' }}>
          <div className="card-title">
            <h2>Create Book</h2>
          </div>
          <div className="card-body"></div>

          {book && (
            <div>
              <h2>
                The Book title is : <b>{book.title}</b> ({bookId.id})
              </h2>
              <h5>Author is : {book.author}</h5>
              <h5>No of Pages are : {book.no_of_pages}</h5>
              <h5>Published at : {book.published_at}</h5>
              <Link className="btn btn-danger" to="/">
                Back to All Books
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* </div>
            </div> */}
    </div>
  );
};

export default BookDetail;
