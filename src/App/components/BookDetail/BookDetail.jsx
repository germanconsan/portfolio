import React, { useEffect, useState } from "react";
import { useParams, useLocation } from 'react-router-dom';
import ApiService from "../../../services/ApiService";
import { Book } from "../../../models/Book";
import './BookDetail.css';


const BookDetail = () => {
    const _ApiService = new ApiService();
    const { id } = useParams();
    const [book, setBook] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    
   

    useEffect(() => {
        const fechtData = /*async*/ () => {
            try {
              //  const result = await _ApiService.get(`/books/${id}`);
              //  setBook(new Book(result.data));
                
               // console.log('Detalles del libro: ', id, ": ", result.data);
               const result = /*await*/ new Book(location.state.book) || {};
               console.log(result);
               setBook(result);
            } catch (error) {
                setError('Error fetching book');
            } finally {
                setLoading(false); // Finaliza la carga, independientemente del resultado
            }
        };

        fechtData();
    }, [id])
    

    return (
        <div>

            {loading ? (<div className="loading">
                <div className="spinner"></div>
                <h2>Cargando...</h2>
            </div>
            ) : error ? (<div>{error}</div>) : (
                <div className="book-detail-page">
                    <div className="book-header">
                        <h2 className="book-title">{book.title}</h2>
                        <p className="book-description">{book.description}</p>
                    </div>

                    <div className="book-attributes">
                    <p><strong>Tags:</strong> {book.tags.join(', ')}</p>
                    <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
                        <p className="book-covers"><strong>Covers:</strong> <img src={book.coverId} alt="Book Cover" /></p>
                    </div>

                    <div className="book-footer">
                        <p>&copy; 2024 - All rights reserved</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BookDetail;