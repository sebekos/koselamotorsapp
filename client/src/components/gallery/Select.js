import React from 'react'

const Select = ({ groups }) => {
    return (
        <div className="form-group">
            <select>
                {groups.map((item, index) => {
                    return <option key={"select-" + index}>{item}</option>
                })}
            </select>
        </div>
    )
}

export default Select
