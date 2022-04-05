    /*global chrome*/

import React from 'react'
import '../stylesheets/dropdown.css'
const LinksList = (props) => {

    function openInNewTab(myurl){
        chrome.runtime.sendMessage({
            msg: "openInTab", 
            data: { url: myurl }
        });
    }
    
    const myLinks = props.links.map((link) =>
    <li className='link-item' key={link}>
        <img src={(link["favicon"] != null) ? link["favicon"]: "https://s2.googleusercontent.com/s2/favicons?domain_url=https://www.google.com"} alt="" width="16" height="16" ></img>
        <button onClick={() => openInNewTab(link["url"])} className='linktext'>{(link["title"] != null) ? link["title"] : "error url"}</button>
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