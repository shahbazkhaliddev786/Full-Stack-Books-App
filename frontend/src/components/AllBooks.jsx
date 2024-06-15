import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// import { useParams } from 'react-router-dom';

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    // const {id} = useParams();

    // fetch all books
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/books");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setBooks(data.allBooks);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchBooks();
    }, [])

    // go to book detail page
    const bookDetail = (id) => {
        navigate(`/detail/${id}`);
    }
    

    // go to book update page
    const updateBook = (id) => {
        navigate(`/update/${id}`);
    }
    

    // delete a book
    const deleteBook = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/books/${id}`, {
                method: "DELETE"
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            toast.success('Book Deleted Successfully');
            console.log(await response.json()); 
        } catch (err) {
            toast.error('Book is not deleted');
            console.error('Fetch error:', err);
        }
    }
    

  
    return (
        <div className="container" style={{marginTop: '4rem'}}>
            <ToastContainer></ToastContainer>
            <div className="card">
                <div className="card-title text-center">
                    <h2>All Books</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="/create" className="btn btn-success">Add New Book</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="bg-dark text-white">Title</th>
                                <th className="bg-dark text-white">Author</th>
                                <th className="bg-dark text-white">No of Pages</th>
                                <th className="bg-dark text-white">Published At</th>
                            </tr>
                        </thead>
                        <tbody>

                        {books.length > 0 ? (
                                books.map((book) => (
                                    <tr key={book._id}>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.no_of_pages}</td>
                                        <td>{book.published_at}</td>
                                        <td>
                                            <button onClick={() => updateBook(book._id)} className="btn btn-success">Update</button>
                                            <button onClick={() => deleteBook(book._id)} className="btn btn-danger">Remove</button>
                                            <button onClick={() => bookDetail(book._id)} className="btn btn-primary">Details</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">No books available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AllBooks;


