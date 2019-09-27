import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { openModal } from '../../Redux/actions/modal'

const About = ({ isAuthenticated, openModal }) => {
    const editText = e => {
        const data = {
            name: e.target.getAttribute('name'),
            text: e.target.textContent
        }
        console.log(data);
        openModal(data);
    }

    return (
        <section id='main'>
            <div className="container">
                <article id='main-col'>
                    <h1 className='page-title'>About</h1>
                    <p onClick={editText} name='about'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum delectus temporibus quisquam error eum nesciunt tempore libero officia, doloremque ratione quia aliquid vero blanditiis sit dicta perferendis maxime in, id dolorum repellat omnis qui illum? Possimus recusandae iusto provident quas, dolor perferendis perspiciatis quibusdam? Velit non tempore itaque quos consectetur voluptate et, facere animi illo quam neque fuga. In sed praesentium quas voluptatibus necessitatibus, qui numquam ipsum consequatur! Molestiae hic omnis rerum, perspiciatis consequatur, suscipit voluptas repellendus beatae iure alias quia, dolorem atque inventore voluptates qui consectetur deserunt itaque ratione nam veritatis eum totam illo. Ducimus neque perferendis id itaque.</p>
                </article>
                <aside id='sidebar'>
                    <div className="dark">
                        <h3>What We Do</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, perspiciatis. Cum sint iste nisi inventore non voluptates voluptatibus quasi repudiandae?</p>
                    </div>
                </aside>
            </div>
        </section>
    )
}

About.propTypes = {
    openModal: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { openModal })(About);
