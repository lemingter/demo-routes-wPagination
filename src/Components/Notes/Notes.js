
import  React from 'react';
import { getNotes } from '../../data';
import { Link, useParams } from 'react-router-dom';
import './Notes.css';

const Notes = () => {
    let notes = getNotes();

    const {noteId} = useParams();

    const filterNotes = (id) => {
        let selectedNote = false;

        if (id > 0) {
            selectedNote = notes.filter(
                note => note.id === Number(id)
            );
        }

        return selectedNote;
    }

    const selectedNote = filterNotes(noteId);

    const renderNotes = (notes) => (
        <ul>
            {
                
                notes.map((note, key) => (
                    <li key={key}>
                        
                        {
                            (selectedNote)?
                            <div>
                                <h1>{note.title}</h1>
                                <p>{note.description}</p>
                            </div>
                            :
                            <Link to={`/notes/${note.id}`}>{note.title}</Link>
                        }

                    </li>
                ))
            }
        </ul> 
    )

   
    return (
        <div className = "Notes">
            <h1>Notes ♠</h1>   
            {renderNotes(selectedNote || notes )}
        </div>
    );
};

export default Notes