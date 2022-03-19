import './App.css';
import {React, useState, useEffect} from 'react'
import GroupDropdown from './groupDropdown';
import LinksList from './LinksList';

function App() {
  
  const [groups, setGroups] = useState()
  const [selected, setSelected] = useState()
//https://www.google.com/search?q=chrome+context+menu+example&oq=chrome+context+menu&aqs=chrome.1.69i57j0i67j0i512l3j69i60l3.4968j0j4&sourceid=chrome&ie=UTF-8
  //context menu: add to group
  //context menu: create new group with tabs

  //create group from button press
  //add new group to json
  //load groups from json     X done
  //delete group from json


  //add link from json
  //delete link from json


  function loadFromJson(){
    fetch('./groupData.json',
    {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    ).then(function(response){
      console.log(response)
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
      setGroups(myJson.groups)
      setSelected(myJson.selected)
    });
  }
  useEffect(()=>{loadFromJson()},[])




  return (
    <div className="App">
      <header>
        <h1>Tab Organizer</h1>
      </header>

      <div className='group-list'>
      <button>+</button>
        <ul>
        {
          groups && groups.length > 0 && groups.map((group)=><li key={group.title}>{group.title}</li>)
        }
        </ul>
      </div>
      <div className='header-list'>
        <div className='title'>
        <p>
          <strong>
          {(selected && selected.title.length > 0) ? selected.title : "undefined"}
          </strong>
          {(selected && selected.description.length > 0) ? selected.description: "undefined"}
          </p>
        </div>
      </div>
      <nav className='links-list'>
          <div className='input_button_group'><button className='addLink'>+</button><input></input></div>
          <LinksList
            links = {(selected && selected.links.length > 0) ? selected.links: ["undefined"]}
            
          />
          <div>delete group</div >
        </nav>

    </div>
  );
}

export default App;
