import React, { useEffect, useState } from "react";
import ApiService from "../../../services/ApiService";
import { Book } from "../../../models/Book";
import './BookList.css'
import { Link } from 'react-router-dom';

const Books = () => {

    const _ApiService = new ApiService();
    const [books, setBook] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const result = await _ApiService.get("/books"); // Espera la respuesta
                setBook(result.data); // Actualiza el estado con los datos de libros
                console.log('Resultado de la petición: ', result);

            } catch (err) {
                setError('Error fetching books');
            } finally {
                setLoading(false); // Finaliza la carga, independientemente del resultado
            }
        };

        fetchData();
    }, []);

    return (
        <div className="books-List">
            {loading ? (<div className="loading">
                <div className="spinner"></div>
                <h2>Cargando...</h2>
            </div>
            ) : error ? (<div>{error}</div>) : (
                <div className="books-grid">
                    {books.map(book => {
                        let bookF = new Book(book);
                        return (
                            <div  key={bookF.id} className="book-detail-card">
                                <h2 className="book-title">{bookF.title}</h2>
                                <p className="book-description"><strong>Description:</strong> {bookF.description}</p>
                                <p className="book-tags"><strong>Tags:</strong> {bookF.tags.join(', ')}</p>
                                <p className="book-authors"><strong>Authors:</strong> {bookF.authors.join(', ')}</p>
                                <p className="book-covers"><strong>Covers:</strong> {bookF.coverId}</p>
                                <Link to={{
                                            pathname:   `/books/${bookF.id}`,
                                            search:     "?param=",
                                            hash:       "#un-hash",
                                            state:      { book }
                                        }}  
                                        className="book-button">
                                                More Details
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};


export default Books;