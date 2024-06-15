import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [noOfPages, setNoOfPages] = useState(0);
    const [publishedAt, setPublishedAt] = useState("");

    const navigate = useNavigate();
    const { bookId } = useParams();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/books/${bookId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setTitle(data.title);
                setAuthor(data.author);
                setNoOfPages(data.no_of_pages);
                setPublishedAt(data.published_at);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
    
        fetchBook();
    }, [bookId]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookData = {
            title,
            author,
            no_of_pages: noOfPages,
            published_at: publishedAt,
        };

        try {
            const response = await fetch(`http://localhost:4000/api/books/${bookId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookData),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            toast.success('Book Updated Successfully');
            navigate('/');
        } catch (error) {
            toast.error('Book is not updated');
            console.error('Fetch error:', error);
        }
    };

    return (
        <div style={{ marginTop: '54px' }}>
            <ToastContainer></ToastContainer>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{ textAlign: "left" }}>
                            <div className="card-title text-center p-3">
                                <h2>Update Book</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group mb-3">
                                            <label>Title</label>
                                            <input value={title} onChange={e => setTitle(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group mb-3">
                                            <label>Author</label>
                                            <input value={author} onChange={e => setAuthor(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group mb-3">
                                            <label>No of Pages</label>
                                            <input type="number" value={noOfPages} onChange={e => setNoOfPages(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group mb-3">
                                            <label>Published At</label>
                                            <input type="date" value={publishedAt} onChange={e => setPublishedAt(e.target.value)} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group mt-4">
                                            <button className="btn btn-success" type="submit">Update</button>
                                            <Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateBook;
