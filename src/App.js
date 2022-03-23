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


//Selected should jsut be an index and all updates should go to groups



  function addGroup(group){
    //add to groups
    groups.push(group)
    setGroups(groups)
    localStorage.setItem('groups', JSON.stringify(groups))
    setSelected(group)
  }

  ///i dont know if this will work
  function deleteGroup(group){
    groups = groups.filter(item => item !==group)
    setGroups(groups)
    localStorage.setItem('groups', JSON.stringify(groups))
  }


  //add link from json
  //delete link from json
  ///untested
  function addlink(link){
    //add to groups
    selected.links.push(link)
    setSelected(selected)
    localStorage.setItem('selected', JSON.stringify(selected))
  }

  /*
  var testObject = { 'one': 1, 'two': 2, 'three': 3 };

  // Put the object into storage
  localStorage.setItem('testObject', JSON.stringify(testObject));

  // Retrieve the object from storage
  var retrievedObject = localStorage.getItem('testObject');

  console.log('retrievedObject: ', JSON.parse(retrievedObject)); 
*/

  //untested
  function deletelink(link){
    selected.links = selected.links.filter(item => item !==link)
    setSelected(selected)
    localStorage.setItem('selected', JSON.stringify(selected))
  }



  function loadFromJson(){

    setGroups(JSON.parse(localStorage.getItem('groups')))
    setSelected(JSON.parse(localStorage.getItem('selected')))


    /*fetch('./groupData.json',
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

      localStorage.setItem('groups', JSON.stringify(myJson.groups))
      localStorage.setItem('selected', JSON.stringify(myJson.selected))
      //SET INITAL LOCAL STORAGE HERE THEN NIX THE JSON BS
      setGroups(myJson.groups)
      setSelected(myJson.selected)
    });*/
  }
  useEffect(()=>{loadFromJson()},[])

  const testgroup = {
    "title": "Empty Title",
    "description": "Write a description here",
    "links": []
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
          groups && groups.length > 0 && groups.map((group)=><li key={group.title} onClick={() => setSelected(group)}>{group.title}</li>)
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
