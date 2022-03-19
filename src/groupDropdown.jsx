import React from 'react'
import './dropdown.css'

const GroupDropdown = () => {

    return(
        <div className="dropdown">
            <button className="dropbtn">Dropdown</button>
            <div className="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
            </div>
        </div>
    )
}

export default GroupDropdown