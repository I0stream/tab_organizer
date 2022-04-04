import React from 'react'
import '../stylesheets/dropdown.css'

const LinksList = (props) => {


    const myLinks = props.links.map((link) =>
    <li className='link-item' key={link}>
        <img src={(link["favicon"] != null) ? link["favicon"]: "https://s2.googleusercontent.com/s2/favicons?domain_url=https://www.google.com"} alt="" ></img>
        <a href={link["url"]} target='_blank' rel="noreferrer noopener" className='linktext'>{(link["title"] != null) ? link["title"] : "error no title"}</a>
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