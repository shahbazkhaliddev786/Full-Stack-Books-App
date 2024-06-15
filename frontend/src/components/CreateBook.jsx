import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const CreateBook = () => {

    const[title,setTitle]=useState("");
    const[author,setAuthor]=useState("");
    const[noOfPages,setNoOfPages]=useState(0);
    const[publishedAt,setPublishedAt]=useState("");


    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookData = { title, author, noOfPages, publishedAt };
      
        try {
          const response = await fetch("http://localhost:4000/api/book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookData),
          });
      
          if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
          }
      
          toast.success('Book Created successfully.');
          console.log(await response.json());
          navigate('/');
        } catch (error) {
          toast.error('Book is not created');
          console.error('Fetch error:', error);
        }
      };
      
    
    
      return (
        <div style={{marginTop: '4rem'}}>
            <ToastContainer></ToastContainer>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>

                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title text-center pt-3">
                                <h2>Create Book</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group mb-3">
                                            <label>Title</label>
                                            <input value={title} onChange={e=>setTitle(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group mb-3">
                                            <label>Author</label>
                                            <input value={author} onChange={e=>setAuthor(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group mb-3">
                                            <label>No of Pages</label>
                                            <input value={noOfPages} onChange={e=>setNoOfPages(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group mt-4">
                                           <button className="btn btn-success" type="submit">Create</button>
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
}

export default CreateBook;