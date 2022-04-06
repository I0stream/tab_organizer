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
    "color": chromeGroupColors[Math.floor(Math.random() * chromeGroupColors.length)]
  }])
  const [selected, setSelected] = useState(0)

  var headerColor = {
    'background-color': groups[selected].color.toString(),
  }

  const emptyGroup = {
    "title": "Empty Title",
    "description": "Write a description here",
    "links": [],
    "uuid": uuidv4(),
    "color": chromeGroupColors[Math.floor(Math.random() * chromeGroupColors.length)]
  }

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

  //create stateful indices
  function addIndicesToLinks(){
    for(let i = 0; i < groups.length; i++){
      groups[i]["index"] = i
      for(let j = 0; i < groups[i].links.length; j++){
        groups[i].links[j]["index"] = j
      }
    }
  }

  function addGroup(group){
    //add to groups
    groups.push(group)
    headerColor['background-color'] = group.color
    setGroups([...groups])//spread old array into a new one, for setstate to recognize it needs a rerender
    localStorage.setItem('groups', JSON.stringify(groups))
    setSelected(group.length - 1)
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

  setGroups(items)
  localStorage.setItem('groups', JSON.stringify(groups))
}


  //Tab Organizer
  return (
    <div className="App">
      <header style={headerColor}>
        <h1>Tab Organizer</h1>
        <GroupDropdown
          colors={chromeGroupColors}
          changeColor={updateColor}
        />
        <button onClick={() => addGroup(emptyGroup)}>+</button>
      </header>

      <div className='group-list'>
      <DragDropContext onDragEnd={groupReorderHandler}>
            <Droppable droppableId="groups">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                {
                  groups && groups.length > 0 && groups.map(
                    (group, index)=>(
                      <Draggable key={group.title} draggableId={group.title} index={index}>
                        {(provided) => (
                          <li className="groupitem" 
                            style={{'background-color': group.color}} 
                            key={group.uuid} 
                            onClick={() => groupOnSelect(group)}
                            ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                          >
                            {group.title}
                          </li>
                        )}
                      </Draggable>
                    )
                  )
                }
                 {provided.placeholder}

                </ul>
              )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className='header-list'>
        <div className='title'>
          <EditText
            name="titleText"
            onSave={updateTitle}
            placeholder={(groups[selected] && groups[selected].title.length > 0) ? groups[selected].title : "undefined"}
          />
          <EditText
            name="descriptionText"
            onSave={updateDesc}
            placeholder={(groups[selected] && groups[selected].description.length > 0) ? groups[selected].description: "undefined"}
          />
          <button onClick={() => OpenGroupHandler()}>Open Group</button>
        </div>
      </div>
      <nav className='links-list'>
          <LinksList
            links = {groups[selected].links}
            deletelinkprops = {deletelink}
            handleOnDragEndLinks = {masterHandleOnDragEndLinks}
          />
          <div><button onClick={() => deleteGroup(groups[selected])}>delete group</button></div>
          <div><button onClick={() => Save()}>saveToCSV</button></div>

      </nav>
    </div>
  );
}

export default App;
