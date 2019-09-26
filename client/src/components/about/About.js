import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import InlineEdit from 'react-edit-inline2'


const About = ({ isAuthenticated }) => {

    const [message, setMessage] = useState('Test');

    const dataChanged = (data) => {
        setMessage(data.message)
    }

    const customValidateText = (text) => {
        return (text.length > 10 && text.length < 64);
    }

    return (
        <section id='main'>
            <div className="container">
                <article id='main-col'>
                    <h1 className='page-title'>About</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum delectus temporibus quisquam error eum nesciunt tempore libero officia, doloremque ratione quia aliquid vero blanditiis sit dicta perferendis maxime in, id dolorum repellat omnis qui illum? Possimus recusandae iusto provident quas, dolor perferendis perspiciatis quibusdam? Velit non tempore itaque quos consectetur voluptate et, facere animi illo quam neque fuga. In sed praesentium quas voluptatibus necessitatibus, qui numquam ipsum consequatur! Molestiae hic omnis rerum, perspiciatis consequatur, suscipit voluptas repellendus beatae iure alias quia, dolorem atque inventore voluptates qui consectetur deserunt itaque ratione nam veritatis eum totam illo. Ducimus neque perferendis id itaque.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, eos laborum ratione reprehenderit, eaque veritatis fugit aut, pariatur numquam error qui esse. Similique cumque rerum molestiae delectus repudiandae vel quod.</p>
                    <h1 className='page-title'>Contact</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, perspiciatis. Cum sint iste nisi inventore non voluptates voluptatibus quasi repudiandae?</p>
                    <p>PHONE</p>
                    <p>EMAIL</p>
                </article>
                <aside id='sidebar'>
                    <div className="dark">
                        <h3>What We Do</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quo quae blanditiis eaque omnis dolorem ipsa commodi amet quidem labore?</p>
                        <InlineEdit
                            isDisabled={!isAuthenticated}
                            validate={customValidateText}
                            text={message}
                            paramName="message"
                            change={dataChanged}
                        />
                    </div>
                </aside>
            </div>
        </section>
    )
}

About.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(About);
