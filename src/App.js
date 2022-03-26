import './stylesheets/App.css';
import {React, useState, useEffect} from 'react'
import GroupDropdown from './components/groupDropdown';
import './stylesheets/dropdown.css'
import LinksList from './components/LinksList';

function App() {
  
  const [groups, setGroups] = useState([{
    "title": "general",
    "description": "python nn project tutorials and useful tools, project work scheduled for april or may at the latest",
    "links": ["google.com", "livecoinwatch.com", "tinyman.com"]
}])
  const [selected, setSelected] = useState(0)
//https://www.google.com/search?q=chrome+context+menu+example&oq=chrome+context+menu&aqs=chrome.1.69i57j0i67j0i512l3j69i60l3.4968j0j4&sourceid=chrome&ie=UTF-8
  //context menu: add to group
  //context menu: create new group with tabs

  //create group from button press
  //load groups 
  //delete group 


//Selected should jsut be an index and all updates should go to groups
//groups[selected]


  function addGroup(group){
    //add to groups
    groups.push(group)
    setGroups(groups)
    localStorage.setItem('groups', JSON.stringify(groups))
    setSelected(group.length - 1)
  }

  ///i dont know if this will work
  function deleteGroup(group){
    groups = groups.filter(item => item !==group)
    setGroups(groups)
    localStorage.setItem('groups', JSON.stringify(groups))
  }


  function addlink(link){
    //add to groups
    groups[selected].links.push(link)
    setGroups(groups)
    localStorage.setItem('groups', JSON.stringify(groups))
  }

  function deletelink(link){
    groups[selected].links = groups[selected].links.filter(item => item !==link)
    setGroups(groups)
    localStorage.setItem('groups', JSON.stringify(groups))
  }


  function loadFromJson(){
    setGroups(JSON.parse(localStorage.getItem('groups')))
    setSelected(JSON.parse(localStorage.getItem('selected')))
  }
  useEffect(()=>{loadFromJson()},[])


  const testgroup = {
    "title": "Empty Title",
    "description": "Write a description here",
    "links": []
  }

  function handleAddLink(){
    
    let linkText = document.getElementById("addLinkInput").value
    console.log(linkText)
    if (linkText == ""){
      console.log("do nothing")
    }else {
      addlink(linkText)
    }
  }


  return (
    <div className="App">
      <header>
        <h1>Tab Organizer</h1>
      </header>

      <div className='group-list'>
      <button onClick={() => addGroup(testgroup)}>+</button>
        <ul>
        {
          groups && groups.length > 0 && groups.map((group)=><li key={group.title} onClick={() => setSelected(groups.indexOf(group))}>{group.title}</li>)
        }
        </ul>
      </div>
      <div className='header-list'>
        <div className='title'>
        <p>
          <strong>
          {(groups[selected] && groups[selected].title.length > 0) ? groups[selected].title : "undefined"}
          </strong>
          {(groups[selected] && groups[selected].description.length > 0) ? groups[selected].description: "undefined"}
          </p>
        </div>
      </div>
      <nav className='links-list'>

          <div className='input_button_group'><button className='addLink' onClick={handleAddLink}>+</button><input id="addLinkInput"/></div>

          <LinksList
            links = {(groups[selected] && groups[selected].links.length > 0) ? groups[selected].links: ["undefined"]}
            deletelinkprops = {deletelink}
          />
          <div>delete group</div >
        </nav>

    </div>
  );
}

export default App;
