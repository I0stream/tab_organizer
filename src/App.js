    /*global chrome*/
import './stylesheets/App.css';
import {React, useState, useEffect} from 'react'
import GroupDropdown from './components/groupDropdown';
import './stylesheets/dropdown.css'
import LinksList from './components/LinksList';

import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { DragDropContext,Droppable, Draggable } from 'react-beautiful-dnd';

import { v4 as uuidv4 } from 'uuid';


function App() {
  const chromeGroupColors = ["grey", "blue", "red", "yellow", "green", "pink", "purple", "cyan", "orange"]

  const [groups, setGroups] = useState([{
    "title": "Empty Title",
    "description": "Write a description here",
    "links": [],
    "uuid": uuidv4(),
    "color": chromeGroupColors[0]
  }])
  const [selected, setSelected] = useState(0)
  //const [pallete, setPallete] = "black"

  var headerColor = {
    'background-color': chromeGroupColors[0]
  }

  function colorTranslate(chromeColor){
    switch(chromeColor){
      case "grey":
        return "#DADCE0";
      case "blue":
        return "#93B4F2"
      case "red":
        return "#E39086";
      case "yellow":
        return "#F6D775";
      case "green":
        return "#91C799";
      case "pink":
        return "#F091C8";
      case "purple":
        return "#BB8CF2";
      case "cyan":
        return "#90D7E9";
      case "orange":
        return "#EFB07A";
      default:
        return "#FFF";
    }
  }


  const emptyGroup = {
    "title": "Empty Title",
    "description": "Write a description here",
    "links": [],
    "uuid": uuidv4(),
    "color": chromeGroupColors[0]
  }
  const safetyLink= {
    "title":"Build an Algorand Web Wallet Interface Using Reach and React | Algorand Developer Portal",
    "url":"https://developer.algorand.org/tutorials/web-wallet-algorand-reach-and-react/",
    "favicon":"https://developer.algorand.org/favicon.ico"}
  

  function initLoad(){
    let fgroups = JSON.parse(localStorage.getItem('groups'))
    let fselected = JSON.parse(localStorage.getItem('selected'))

    if (fgroups === null || fselected=== null){
    setGroups([emptyGroup])
    setSelected(0)
    localStorage.setItem('groups', JSON.stringify(groups))
    localStorage.setItem('selection', 0)

    }else{
      setGroups(fgroups)
      setSelected(fselected)
      //addIndicesToLinks()
      //localStorage.setItem('groups', JSON.stringify(groups))
    }
    
  }
  useEffect(()=>{initLoad()},[])


  function addGroup(group){
    //add to groups
    groups.unshift(group)//unshift?
    setGroups([...groups])//spread old array into a new one, for setstate to recognize it needs a rerender

    localStorage.setItem('groups', JSON.stringify(groups))
    //setSelected(group.length - 1)
  }

  function deleteGroup(group){
    if (selected === 0){
      localStorage.setItem('selected', 1)
      setSelected(1)
    }else {
      localStorage.setItem('selected', 0)
      setSelected(0)
    }

    let mygroups = groups.filter(item => item !== group)
    
    setGroups([...mygroups])
    localStorage.setItem('groups', JSON.stringify(mygroups))
  }

  function deletelink(link){
    groups[selected].links = groups[selected].links.filter(item => item !== link)
    setGroups([...groups])
    localStorage.setItem('groups', JSON.stringify(groups))
  }

  function groupOnSelect(group){
    localStorage.setItem('selected', groups.indexOf(group))
    setSelected(groups.indexOf(group))
    setGroups([...groups])
  }

  function updateDesc(desc){
    groups[selected].description = desc.value
    setGroups([...groups])
    localStorage.setItem('groups', JSON.stringify(groups))
  }
  function updateTitle(title){
    groups[selected].title = title.value
    setGroups([...groups])
    localStorage.setItem('groups', JSON.stringify(groups))
  }
  function updateColor(color){
    groups[selected].color = color
    setGroups([...groups])
    localStorage.setItem('groups', JSON.stringify(groups))
  }
  function cycleColor(){
    console.log(chromeGroupColors)
    var colorIndex = chromeGroupColors.indexOf(groups[selected].color)

    if (colorIndex === chromeGroupColors.length - 1){
      updateColor(chromeGroupColors(0))
    } else{
      updateColor(chromeGroupColors(colorIndex))
    }

    //cycle through them and apply the new color
  }



  function OpenGroupHandler(){
    chrome.runtime.sendMessage({
      msg: "openGroup"
    });
  }

  function Save(){
    chrome.runtime.sendMessage({
      msg: "save"
    });
  }

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "newLink") {
            //  To do something
            setGroups(JSON.parse(localStorage.getItem('groups'))
            )
        }
    }
);


function masterHandleOnDragEndLinks(result){
  const items = groups[selected].links
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);

  groups[selected].links = items

  setGroups([...groups])
  localStorage.setItem('groups', JSON.stringify(groups))
}

function groupReorderHandler(result){
  const items = groups
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);
  setSelected(result.destination.index)
  setGroups(items)
  localStorage.setItem('selection', selected)
  localStorage.setItem('groups', JSON.stringify(groups))
}


  //Tab Organizer
  return (
    <div className="App">
      <header>
        <div class="colorContainer" >
          <button class="colorButton" 
            onClick={cycleColor}
            style={{"background-color": 
            (groups[selected] !== null) ? colorTranslate(groups[selected].color) : "#DADCE0" }}
          />
        </div>
        <div>
          <button onClick={() => OpenGroupHandler()}>Open</button>
        </div>
      </header>

      <div className='group-list'>
      <button onClick={() => addGroup(emptyGroup)}>+ New Group</button>
      <DragDropContext onDragEnd={groupReorderHandler}>
            <Droppable droppableId="groups">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                {
                  groups && groups.length > 0 && groups.map(
                    (group, index)=>(
                      <Draggable 
                        key={group.title} 
                        draggableId={group.title} 
                        index={index} 
                        >
                        {(provided) => (
                          <li 
                            className={`${selected === index ? 'groupitemactive' : 'groupitem'}`}
                            key={group.uuid} 
                            onClick={() => groupOnSelect(group)}
                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                          >
                            {group.title}
                          </li>
                        )}
                      </Draggable>
                ))}
                {provided.placeholder}

                </ul>
              )}
          </Droppable>
        </DragDropContext>
        <button
          onClick={() => deleteGroup(groups[selected])}
        >Delete Group</button>
      </div>

        <div className='headerBar'>
          <EditText
            name="titleText"
            onSave={updateTitle}
            placeholder={(groups[selected] && groups[selected].title.length > 0) ? groups[selected].title : "undefined"}
            inline
          />
          <button
            className='groupTitle'
            style={{"background-color": 
            (groups[selected] !== null) ? colorTranslate(groups[selected].color) : "#DADCE0"}}
          >{(groups[selected] && groups[selected].title.length > 0) ? groups[selected].title : "undefined"}</button>

          <input
		        type="text"
		        style={editMode}
		        className={styles.textInput}
		        value={(groups[selected] && groups[selected].description.length > 0) ? groups[selected].description: "undefined"}
		        onSubmit={e => {
		          updateDesc}
		        onKeyDown={handleUpdatedDone}
	      	/>

          <GroupDropdown
            className="gDropdown"
            buttonColor={(groups[selected] !== null) ? colorTranslate(groups[selected].color) : "#DADCE0"}
            Save={Save}
          />
        </div>
      <nav className='links-list'>
          <LinksList
            links = {(groups[selected] !== null) ? groups[selected].links : [safetyLink]}
            deletelinkprops = {deletelink}
            handleOnDragEndLinks = {masterHandleOnDragEndLinks}
          />
      </nav>
    </div>
  );
}

export default App;


/*<div className='headerBar'>
        <div style={{headerColor}}>
          <h1
            className='groupTitle'
            onClick={() => OpenGroupHandler()}
          >{(groups[selected] && groups[selected].title.length > 0) ? groups[selected].title : "undefined"}</h1>
        </div>

        <input
          className='description'
          value={(groups[selected] && groups[selected].description.length > 0) ? groups[selected].description: "undefined"}
          onSubmit={updateDesc}
        />
        
        <GroupDropdown
          colors={chromeGroupColors}
          changeColor={updateColor}
          buttonColor={colorTranslate(groups[selected])}
        />
      </div> */