    /*global chrome*/

import React from 'react'
import '../stylesheets/dropdown.css'
//import { ReactComponent as Hamburger } from "../hamburger.svg";
import { DragDropContext,Droppable, Draggable } from 'react-beautiful-dnd';


const LinksList = (props) => {
    const backupFavicon = "https://s2.googleusercontent.com/s2/favicons?domain_url=https://www.google.com"

    function openInNewTab(myurl){
        chrome.runtime.sendMessage({
            msg: "openInTab", 
            data: { url: myurl }
        });
    }
    
    const myLinks = 
        props.links.map(
            (link, index) => (
                <Draggable key={link.title} draggableId={link.title} index={index}>
                    {(provided) => (
                        <li className='link-item' 
                            key={index} 
                            onClick={() => openInNewTab(link["url"])} 
                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                        >
                            <img src={(link["favicon"] != null) ? link["favicon"]: backupFavicon} alt="" width="16" height="16" />
                            <p className='linktext' onClick={() => openInNewTab(link["url"])}>
                                {(link["title"] != null) ? link["title"] : "error url"}
                            </p>
                            <button onClick={() => props.deletelinkprops(link)}>-</button>
                        </li>
                    )}
                </Draggable>
            )
        )

    return(
        <DragDropContext onDragEnd={props.handleOnDragEndLinks}>
              <Droppable droppableId="links">
              {(provided) => (
                <ul className="lul" {...provided.droppableProps} ref={provided.innerRef}>
                    {myLinks}
                    {provided.placeholder}
                </ul>
              )}
            </Droppable>
         </DragDropContext>
    )
}

export default LinksList

/*
<DraggableList width={300} height={50} rowSize={1}>
            {listItems.map((item, index) => (
              <li key={index}>{`${index + 1}.  ${item}`}</li>
            ))}
          </DraggableList>
*/