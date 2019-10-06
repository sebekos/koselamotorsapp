import React from 'react'
import EditModal from '../modal/EditModal'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <section className="dashboard">
            <div className="container">
                <div className="instructions">
                    <h1>Edit Text</h1>
                    <p>Go to any page, double click on any text box then save.</p>
                </div>
                <div className="instructions">
                    <h1>Photo Tools</h1>
                    <Link className='btn btn-success' to='/addphotos'>Add Photos</Link>
                    <Link className='btn btn-primary' to='/reorderphotos'>Reorder Photos</Link>
                    <Link className='btn btn-danger' to='/deletephotos'>Delete Photos</Link>
                </div>
                <EditModal />
            </div>
        </section>
    )
}

export default Dashboard
