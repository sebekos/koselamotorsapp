import React from 'react'
import EditModal from '../modal/EditModal'

const Dashboard = () => {
    return (
        <section className="dashboard">
            <div className="container">
                <div className="instructions">
                    <h1>Instructions</h1>
                    <p>Go to any page, double click on any text box then save.</p>
                </div>
                <EditModal />
            </div>
        </section>
    )
}

export default Dashboard
