import React from 'react'
import '../stylesheets/dropdown.css'

const LinksList = (props) => {


    const myLinks = props.links.map((link) =>
    <li className='link-item' key={link}>
        <div className='linktext'>{link}</div>
        <button onClick={() => props.deletelinkprops(link)}>-</button>
    </li>

    )

    return(
        <ul className="lul">
            {myLinks}
         </ul>
    )
}

export default LinksList