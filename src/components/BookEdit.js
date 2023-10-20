// src/components/BookEdit.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookEdit({ bookId }) {
  const [book, setBook] = useState({});
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    axios.get('/api/book/' + bookId)
      .then(response => {
        setBook(response.data);
        setAuthor(response.data.author);
        setTitle(response.data.title);
        setGenre(response.data.genre);
      })
      .catch(error => {
        alert('Error fetching book data:', error);
      });
  }, [bookId]);

  const handleUpdate = () => {
    const updatedBook = {
      ...book,
      author,
      title,
      genre
    };

    axios.post('/api/book/edit/' + bookId, updatedBook)
      .then(() => {
        alert('Book updated successfully');
      })
      .catch(error => {
        alert('Error updating book:', error);
      });
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Edit Book</h1>
      <div>
        <label>Author:</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} style={inputStyle} />
      </div>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
      </div>
      <div>
        <label>Genre:</label>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} style={inputStyle} />
      </div>
      <button onClick={handleUpdate} style={buttonStyle}>Update</button>
      <a href='/'>Home page</a>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '8px',
  margin: '5px 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  backgroundColor: '#007BFF',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px',
};

export default BookEdit;