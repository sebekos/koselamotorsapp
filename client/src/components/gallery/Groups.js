import React from 'react'

const Groups = () => {
    return (
        <div className="form add-group">
            <div className="form-group add-group-input">
                <input type="text" placeholder='New Group Name' />
                <button className="btn btn-success">Add</button>
            </div>
            <div className="form-group">
                <select>
                    <option value="" defaultValue disabled>Existing Photo Groups</option>
                    <option value="">Engine</option>
                    <option value="">Audi S4 1997</option>
                    <option value="">Subaru Impreza</option>
                </select>
            </div>
        </div>
    )
}

export default Groups
