import React from 'react'
import '../stylesheets/dropdown.css'

const LinksList = (props) => {


    const myLinks = props.links.map((link) =>
    <li className='link-item' key={link}>
        <a href={link} target='_blank' rel="noreferrer noopener" className='linktext'>{link}</a>
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