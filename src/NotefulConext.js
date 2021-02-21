import React from 'react'

const NotefulContext = React.createContext({
    notes: [],
    folders: [],
    addNotes: () => {},
    addFolders: () => {},
    deleteNotes: () => {}
})

export default NotefulContext