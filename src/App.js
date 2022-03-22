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
  //load groups 
  //delete group 

  //JSON IS NOT THE WAY, LOCAL STORAGE FOR LOCAL STORAGE REEEEEEEEEEEEEEEEEEEEEEEEEEEEEE

  function addGroup(group){
    //add to groups
    console.log(typeof(groups))
    groups.push(group)
    //setGroups(groups)             //?
    let obj = {groups}
    //update all json data
    JSON.stringify(obj)

  }

  ///i dont know if this will work
  function deleteGroup(group){
    fetch('./groupData.json',
    {
      method: 'DELETE',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
       body: JSON.stringify(group),
    })
    .then(response => response.json())
    .then(obj => {
      console.log('Success:', obj);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


  //add link from json
  //delete link from json
  ///untested
  function addlink(link){
    //add to groups
    selected.links.push(link)
    setSelected(selected)         //?
    let obj = {groups, selected}
    //update all json data
    fetch('./groupData.json',
    {
      method: 'POST',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
       body: JSON.stringify(obj),
    })
    .then(response => response.json())
    .then(obj => {
      console.log('Success:', obj);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  //untested
  function deletelink(link){

    fetch('./groupData.json',
    {
      method: 'DELETE',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
       body: JSON.stringify(selected.links.link),
    })
    .then(response => response.json())
    .then(obj => {
      console.log('Success:', obj);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }



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

      //SET INITAL LOCAL STORAGE HERE THEN NIX THE JSON BS
      setGroups(myJson.groups)
      setSelected(myJson.selected)
    });
  }
  useEffect(()=>{loadFromJson()},[])

  const testgroup = {
    "title": "test",
    "description": " the latest",
    "links": ["monkey.com", "pets.com", "facebook.com"]
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
