import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import '../style/Notes.css';

function DispNotes({ note, onDelete, onEdit }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedDate = new Date(note.created_at).toLocaleDateString("es-NI");
  const formattedUpdateDate = new Date(note.updated_at).toLocaleDateString('es-NI');

  // Definimos el contenido que se muestra
  const contentPreview = note.content.length > 200 && !isExpanded
    ? note.content.slice(0, 200) + "..."
    : note.content;

  return (
    <div className="note-container">
      <p className="note-title" style={{ fontWeight: 'bold' }}>{note.title}</p>

      <p className="note-content">{contentPreview}</p>
      {note.content.length > 200 && (
        <button
          className="toggle-button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Ver menos" : "Ver más"}
        </button>
      )}

      <p className="note-date">Creada el {formattedDate}</p>
      <p className="note-update">Últimos cambios {formattedUpdateDate}</p>

      <div className="note-buttons">
        <button className="edit-btn" onClick={() => onEdit(note)}>
          <FaEdit style={{ marginRight: '5px' }} />
          Editar
        </button>

        <button className="delete-button" onClick={() => onDelete(note.id)}>
          <FaTrash style={{ marginRight: '5px' }} />
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default DispNotes;
