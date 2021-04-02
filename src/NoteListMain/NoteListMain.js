import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import NotefulContext from '../NotefulConext'
import { getNotesForFolder} from '../notes-helpers'
import './NoteListMain.css'

class NoteListMain extends Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }

  static contextType = NotefulContext

  render() { 
    const {folderId} = this.props.match.params
    const {notes = []} = this.context
    const notesForFolder = getNotesForFolder(notes, folderId)
    return (  
      <section className = 'NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key = {note.id}>
              <Note 
                id = {note.id}
                name = {note.note_name}
                modified = {note.date_published}
              />
            </li>
            )}
        </ul>
        <div className = 'NoteListMain__button-container'>
          <CircleButton tag = {Link} to = '/add-note' type = 'button' className = 'NoteListMain__add-note-button'>
            <FontAwesomeIcon icon = 'plus'/>
            <br/>
            Note
          </CircleButton>
        </div>
      </section>
    )
  }
}
 
export default NoteListMain;