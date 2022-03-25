import React from 'react'

const LinksList = (props) => {
    const myLinks = props.links.map((link) =>
    <li className='link-item' key={link}>
        <div className='linktext'>{link}</div>
        <button>\/</button>
    </li>

    )

    return(
        <ul className="lul">
            {myLinks}
         </ul>
    )
}

export default LinksList