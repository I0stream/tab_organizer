import './stylesheets/App.css';
import {React, useState, useEffect} from 'react'
import GroupDropdown from './components/groupDropdown';
import './stylesheets/dropdown.css'
import LinksList from './components/LinksList';

import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

import { v4 as uuidv4 } from 'uuid';


function App() {
  
  /*const [groups, setGroups] = useState([{
    "title": "general",
    "description": "python nn project tutorials and useful tools, project work scheduled for april or may at the latest",
    "links": ["google.com", "livecoinwatch.com", "tinyman.com"],
    "uuid": uuidv4()

}])*/

  const [groups, setGroups] = useState([{
      "title": "general",
      "description": "python nn project tutorials and useful tools, project work scheduled for april or may at the latest",
      "links": [
        {"title": "google", "url": "google.com", "favicon": "https://s2.googleusercontent.com/s2/favicons?domain_url=google.com"},
        {"title": "Live Cryptocurrency prices, charts", "url": "livecoinwatch.com", "favicon": "https://s2.googleusercontent.com/s2/favicons?domain_url=livecoinwatch.com"},
        {"title": "TinyMan|Decentralized trading", "url": "livecoinwatch.com", "favicon": "https://s2.googleusercontent.com/s2/favicons?domain_url=livecoinwatch.com"}],
      "uuid": uuidv4()
  }])
  const [selected, setSelected] = useState(0)

  //context menu: add to group
  //context menu: create new group with tabs

  function addGroup(group){
    //add to groups
    groups.push(group)
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
  const emptyGroup = {
    "title": "Empty Title",
    "description": "Write a description here",
    "links": [],
    "uuid": uuidv4()
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
    }
    
  }
  useEffect(()=>{initLoad()},[])



  function groupOnSelect(group){
    localStorage.setItem('selected', groups.indexOf(group))
    setSelected(groups.indexOf(group))
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
  async function OpenGroupHandler(){
    
    //var groupId = await chrome.tabs.group({ tabIds: tabId });
    //chrome.tabGroups.update(groupId, { collapsed: false, title: "title", color: "blue" });
  }

  
  
  return (
    <div className="App">
      <header>
        <h1>Tab Organizer</h1>
      </header>

      <div className='group-list'>
      <button onClick={() => addGroup(emptyGroup)}>+</button>
        <ul>
        {
          groups && groups.length > 0 && groups.map((group)=><li key={group.uuid} onClick={() => groupOnSelect(group)}>{group.title}</li>)
        }
        </ul>
      </div>


      <div className='header-list'>
        <div className='title'>
          <EditText
            name="titleText"
            onSave={updateTitle}
            showEditButton
            defaultValue={(groups[selected] && groups[selected].title.length > 0) ? groups[selected].title : "undefined"}
          />
          <EditText
            name="descriptionText"
            onSave={updateDesc}
            showEditButton
            defaultValue={(groups[selected] && groups[selected].description.length > 0) ? groups[selected].description: "undefined"}
          />
          <button onClick={OpenGroupHandler()}>Open Group</button>
        </div>
      </div>


      <nav className='links-list'>
          <LinksList
            links = {(groups[selected] && groups[selected].links.length > 0) ? groups[selected].links: ["undefined"]}
            deletelinkprops = {deletelink}
          />
          <div><button onClick={() => deleteGroup(groups[selected])}>delete group</button></div>
      </nav>

    </div>
  );
}

export default App;


/*function addlink(link){
    //add to groups
    groups[selected].links.push(link)
    setGroups([...groups])
    localStorage.setItem('groups', JSON.stringify(groups))
  }*/

/*
  function handleAddLink(){
    
    let linkText = document.getElementById("addLinkInput").value
    console.log(linkText)
    if (linkText === ""){
      console.log("do nothing")
    }else {
      addlink(linkText)
      document.getElementById("addLinkInput").value = ""
    }
  }*/

//Failed to execute 'postMessage' on 'Window': Invalid target origin in a call to 'postMessage'.
  /*window.addEventListener("message", event => {
    alert(event.data)
    if (event.source !== window){
      return;}

    const {tab, type} = event.data;
    addlink(tab)
    if (tab == null){
      return;
    }

    console.log(tab)
    if (type !== "*"){
      return;}

  });*/
