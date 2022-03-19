import './App.css';
import GroupDropdown from './groupDropdown';

function App() {
//https://www.google.com/search?q=chrome+context+menu+example&oq=chrome+context+menu&aqs=chrome.1.69i57j0i67j0i512l3j69i60l3.4968j0j4&sourceid=chrome&ie=UTF-8
  //context menu: add to group
  //context menu: create new group with tabs

  //create group from button press

  //add new group to json
  //load groups from json
  //delete group from json


  //add link from json
  //delete link from json



  return (
    <div className="App">
      <header>
        <h1>Tab Organizer</h1>
      </header>

      <div className='group-list'>
      <button>+</button>
        <ul>
          <li>py</li>
          <li>crypto</li>
          <li>react</li>
          <li>jobs</li>
          <li>unreal</li>
        </ul>
      </div>

      <div className='header-list'>
        <div className='title'>
        <p><strong>py links</strong> python nn project tutorials and useful tools, project work scheduled for april or may at the latest</p>

          <GroupDropdown />
        </div>
      </div>
      <nav className='links-list'>
          <div className='input_button_group'><button className='addLink'>+</button><input></input></div>
          <ul className="lul">
            <li className='link-item'><div className='linktext'>https://medium.com/techie-delight/top-25-algorithms-every-programmer-should-know-373246b4881b</div><button>\/</button></li>
            
          </ul>
        
          <div>delete group</div>
        </nav>

    </div>
  );
}

export default App;
