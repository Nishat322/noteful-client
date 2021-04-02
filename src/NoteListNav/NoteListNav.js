import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import NotefulContext from '../NotefulConext'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'

class NoteListNav extends Component {
  static contextType = NotefulContext

  render() { 
    const { folders = [], notes = []} = this.context
    return (  
      <div className = 'NotesListNav'>
        <ul className = 'NoteListNav__list'>
          {folders.map(folder =>
            <li key = {folder.id}>
              <NavLink className = 'NoteListNav__folder-link' to = {`/folder/${folder.id}`}>
                {folder.folder_name}
              </NavLink>
            </li>
            )}
        </ul>
        <div className = 'NoteListNav__button-wrapper'>
          <CircleButton tag = {Link} to = '/add-folder' type = 'button' className = 'NoteListNav__add-folder-button'>
            <FontAwesomeIcon icon = 'plus'/>
            <br/>
            Folder
          </CircleButton>
        </div>
      </div>
    )
  }
}
 
export default NoteListNav;
