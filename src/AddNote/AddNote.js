import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import NotefulContext from '../NotefulConext'
import ValidationError from '../ValidationError/ValidationError'
import config from '../config'
import './AddNote.css'
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry'

class AddNote extends Component {
    static defaultProps = {
        history: {
            push: () => {}
        }
    }

    static contextType = NotefulContext

    constructor(props){
        super(props)
        this.state = {
            name: {
                value: '',
                touched: false
            }
        }
    }

    validateName(){
        const name = this.state.name.value.trim()
        if(name.length === 0){
            return 'Name is required'
        }
    }

    updateName(name){
        this.setState({name: {value: name, touched: true}})
    }

    handleSubmit = e => {
        e.preventDefault()
        const newNote = {
            name: e.target['note-name'].value,
            content: e.target['note-content'].value,
            folderId: e.target['note-folder-id'].value,
            modified: new Date()        
        }
        fetch(`${config.API_ENDPOINT}/notes`,{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newNote)
        })
            .then(res => {
                if(!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(note => {
                this.context.addNotes(note)
                this.props.history.push(`/folder/${note.folderId}`)
            })
            .catch(error => {
                console.error({error})
            })
    }

    render() { 
        const {folders = []} = this.context
        const nameError = this.validateName()
        return (  
            <div className = 'AddNote'>
                <h2>Add a Note</h2>
                <ErrorBoundry>
                <NotefulForm onSubmit = {this.handleSubmit}>
                    <div className = 'field'>
                        <label htmlFor = 'note-name'>Name</label>
                        <input type = 'text' id = 'note-name' name = 'note-name' onChange = {e => this.updateName(e.target.value)}/>
                        {this.state.name.touched && <ValidationError message = {nameError}/>}
                    </div>
                    <div className = 'field'>
                        <label htmlFor = 'note-content'>Content</label>
                        <textarea id = 'note-content' name = 'note-content'/>
                    </div>
                    <div className = 'field'>
                        <label htmlFor = 'note-folder-select'>Folder</label>
                        <select id = 'note-folder-select' name = 'note-folder-id'>
                            <option value = {null}>...</option>
                            {folders.map(folder =>
                                <option key = {folder.id} value = {folder.id}>
                                {folder.name}
                            </option>
                            )}
                        </select>
                    </div>
                    <div className = 'button'>
                        <button type = 'submit' disabled = {this.validateName()}>Add Note</button>
                    </div>
                </NotefulForm>
                </ErrorBoundry>
            </div>
        )
    }
}
 
export default AddNote;