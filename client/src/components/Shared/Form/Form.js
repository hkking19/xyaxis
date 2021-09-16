import React from 'react'
import PropTypes from 'prop-types';
import './Form.css'

const Form = ({title,children}) => (
      <div className="content">
        <header>
          <h1>{title}</h1>
        </header>
        <section>
          {children}
        </section>
      </div>
    )

Form.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
}

export default Form
