import React from 'react'

const Boxes = () => {
    var path = document.location.pathname;
    var directory = path.substring(path.indexOf('/'), path.lastIndexOf('/'));
    console.log(directory);
    return (
        <section id='boxes'>
            <div className="container">
                <div className="box">
                    <i className="fas fa-car-crash fa-4x"></i>
                    <h3>Maintenance</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis mollitia nemo eum quibusdam quaerat repellendus, beatae tenetur at voluptate inventore?</p>
                </div>
                <div className="box">
                    <i className="fas fa-tools fa-4x"></i>
                    <h3>Engine Work</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis mollitia nemo eum quibusdam quaerat repellendus, beatae tenetur at voluptate inventore?</p>
                </div>
                <div className="box">
                    <i className="fas fa-toolbox fa-4x"></i>
                    <h3>Custom Builds</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis mollitia nemo eum quibusdam quaerat repellendus, beatae tenetur at voluptate inventore?</p>
                </div>
            </div>
        </section>
    )
}

export default Boxes