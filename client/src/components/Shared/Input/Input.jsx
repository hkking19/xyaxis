import React from 'react'
import './Input.css'

const Input = ({placeholder,name,type,width,onChange}) => {
    return (
        <div className="input-field">
            <input
                style={{width}} 
                type={type} 
                placeholder={placeholder} 
                name={name} 
                onChange={onChange}
            />
      </div>
    )
}

export default Input
