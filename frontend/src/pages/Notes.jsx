import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import DispNotes from "../components/DispNotes";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../style/Notes.css';
import { FaPlus, FaTimes } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";


function Notes() {
  const [username, setUsername] = useState('');
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);


  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || 'Usuario');
  }, []);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api.get('notes/')
      .then((res) => setNotes(res.data))
      .catch((err) => toast.error("Error al cargar notas"));
  };

  const deleteNote = (id) => {
    api.delete(`notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) toast.success('Nota eliminada!');
        else toast.error('Error al eliminar la nota.');
        getNotes();
      })
      .catch((error) => toast.error(error.message));
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  if (editingNoteId) {
    // Editar nota existente
      api.put(`/notes/${editingNoteId}/`, { title, content })
      .then((res) => {
        toast.success('Nota actualizada!');
        setEditingNoteId(null);
        setTitle('');
        setContent('');
        setShowForm(false);
        getNotes();
      })
      .catch((err) => toast.error("Error al editar la nota."));
  } else {
    // Crear nota nueva
    api.post("/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) toast.success('Nota creada!');
        else toast.error('Error al crear la nota.');
        getNotes();
        setTitle('');
        setContent('');
        setShowForm(false);
      })
      .catch((err) => toast.error(err.message));
  }
};

  //editar nota
  const editNote = (note) => {
  setEditingNoteId(note.id);
  setTitle(note.title);
  setContent(note.content);
  setShowForm(true);
};

//logout
  const handleLogout = () => {
    localStorage.clear();
    navigate('/home');
  };

  //html
  return (
    <div className="notes-wrapper">
      <ToastContainer />

      <nav className="navbar">
        <h1 className="navbar-title">Bienvenido, {username} 👋</h1>
 <button onClick={handleLogout} className="logout-btn">
      <FiLogOut style={{ marginRight: '5px' }} />
      Cerrar sesión
    </button>      </nav>

      <div className="notes-controls">
        <h2 style={{marginLeft:'-264px'}}>Notas</h2>
 <button
  className="new-note-btn"
  onClick={() => {
    setShowForm(!showForm);
    if (!showForm) {
      setTitle('');
      setContent('');
      setEditingNoteId(null);
    }
  }}
>
  {showForm ? <><FaTimes /> Cancelar</> : <><FaPlus /> Nueva Nota</>}
</button>

      </div>

      {/* Formulario con animación */}
      <div className={`note-form-container ${showForm ? "visible" : "hidden"}`}>
        <form onSubmit={handleSubmit} className="note-form">
          <label htmlFor="title">Título:</label>
          <input type="text" id="title" required value={title} onChange={(e) => setTitle(e.target.value)} />

          <label htmlFor="content">Contenido:</label>
          <textarea id="content" required value={content} onChange={(e) => setContent(e.target.value)}></textarea>

          <input type="submit" value={editingNoteId ? 'Guardar cambios': 'Crear nota'} />
        </form>
      </div>

      <div className="notes-grid">
        {notes.map((note) => (
          <DispNotes note={note} onDelete={deleteNote} onEdit={editNote} key={note.id} />
        ))}
      </div>
    </div>
  );
  
}

export default Notes;
