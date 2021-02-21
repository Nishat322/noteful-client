import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import NotefulContext from '../NotefulConext'
import ValidationError from '../ValidationError/ValidationError'
import config from '../config'
import './AddFolder.css'

import './AddFolder.css'
import ErrorBoundry from '../ErrorBoundry/ErrorBoundry'

class AddFolder extends Component {
    static defaultProps = {
        history: { push: () => {}}
    }

    static contextType = NotefulContext

    constructor(props){
        super(props)
        this.state = {
            name: {
                value: '',
                touched: false
            },
        }
    }

    updateName(name){
        this.setState({name:{value: name, touched: true}})
    }

    handleSubmit = e => {
        e.preventDefault()
        const folder = {
            name: e.target['folder-name'].value
        }
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder)
        })
            .then(res => {
                if(!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(folder => {
                this.context.addFolders(folder)
                this.props.history.push(`/folder/${folder.id}`)
            })
            .catch(error => {
                console.error({error})
            })
    }

    validateName(){
        const name = this.state.name.value
        if (name.length === 0){
            return 'Name is Missing'
        }
    }
   

    render() { 
        const nameError = this.validateName()
        return ( 
            <div className = 'AddFolder'>
                <h2>Add a New Folder</h2>
                <ErrorBoundry>
                <NotefulForm onSubmit = {this.handleSubmit}>
                    <div className = 'field'>
                        <label htmlFor = 'folder-name'>Name</label>
                        <input type = 'text' id = 'folder-name' name = 'folder-name' onChange = {e => this.updateName(e.target.value)}/>
                        {this.state.name.touched && <ValidationError message = {nameError}/>}
                    </div>
                    <div className = 'button'>
                        <button type = 'submit' disabled = {this.validateName()}> Add Folder </button>
                    </div>
                </NotefulForm>
                </ErrorBoundry>
            </div>
        )
    }
}
 
export default AddFolder;