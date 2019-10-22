import React, { useState, Fragment } from 'react'
import { addGallery } from '../../Redux/actions/photo'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


const AddGallery = ({ addGallery }) => {
    const [input, setInput] = useState(false);
    const [group, setGroup] = useState('');

    const onClick = () => {
        setInput(!input);
    }

    const onChange = e => {
        setGroup(e.target.value);
    }

    const addGroup = () => {
        addGallery({ group: group });
    }

    return (
        <Fragment>
            <div className="form">
                <div>
                    {!input ? <button onClick={onClick} className="btn btn-success">Add Gallery</button> : null}
                </div>
                {input ?
                    <div className='add-gallery'>
                        <input onChange={onChange} type="text" className="text" placeholder="Gallery name..." value={group} />
                        <button onClick={addGroup} className="btn btn-primary">Add</button>
                    </div> : null}
            </div>
        </Fragment>
    )
}

AddGallery.propTypes = {
    addGallery: PropTypes.func.isRequired
}

export default connect(null, { addGallery })(AddGallery)
