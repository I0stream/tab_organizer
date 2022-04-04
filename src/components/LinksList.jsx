import React from 'react'
import '../stylesheets/dropdown.css'

const LinksList = (props) => {


    const myLinks = props.links.map((link) =>
    <li className='link-item' key={link}>
        <img src="https://developer.chrome.com/images/meta/favicon-32x32.png" ></img>
        <a href={link} target='_blank' rel="noreferrer noopener" className='linktext'>link title</a>
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