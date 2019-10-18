import React, { useState } from 'react'
import Select from './Select'


const Groups = ({ ongroup }) => {
    const [text, setText] = useState('');
    const [groups, setGroups] = useState(['Subaru', 'Engine']);

    const onChange = e => {
        setText(e.target.value);
    }

    const onAdd = () => {
        if (text.length < 1)
            return console.log('too short');
        setGroups([...groups, text]);
        setText('');
    }

    return (
        <div className="form add-group">
            <div className="form-group add-group-input">
                <input onChange={onChange} type="text" placeholder='New Group Name' value={text} />
                <button onClick={onAdd} className="btn btn-success">Add</button>
            </div>
            <Select groups={groups} ongroup={ongroup} />
        </div>
    )
}

export default Groups
