import React from 'react'
import '../stylesheets/dropdown.css'
import{FiChevronDown} from 'react-icons/fi';
import { IconContext } from "react-icons";



const GroupDropdown = (props) => {
  
  const currentColor = props.buttonColor

  return(
      <div className="dropdown">
        <IconContext.Provider value={{ color: currentColor, className: "global-class-name", size: 40 }}>
          <div><FiChevronDown className="dropbtn"  /></div>
          </IconContext.Provider>
          <div className="dropdown-content">
              <button>Edit</button>
              <button onClick={props.Save}>Download</button>
          </div>
      </div>
  )
}

export default GroupDropdown

/*
body {
  color: #000000;
  font-family: Sans-Serif;
  padding: 30px;
  background-color: #f6f6f6;
}

a {
  text-decoration: none;
  color: #000000;
}

a:hover {
  color: #222222
}

 Dropdown

.dropdown {
    display: inline-block;
    position: relative;
  }
  
  .dd-button {
    display: inline-block;
    border: 1px solid gray;
    border-radius: 4px;
    padding: 10px 30px 10px 20px;
    background-color: #ffffff;
    cursor: pointer;
    white-space: nowrap;
  }
  
  .dd-button:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    width: 0; 
    height: 0; 
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid black;
  }
  
  .dd-button:hover {
    background-color: #eeeeee;
  }
  
  
  .dd-input {
    display: none;
  }
  
  .dd-menu {
    position: absolute;
    top: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0;
    margin: 2px 0 0 0;
    box-shadow: 0 0 6px 0 rgba(0,0,0,0.1);
    background-color: #ffffff;
    list-style-type: none;
  }
  
  .dd-input + .dd-menu {
    display: none;
  } 
  
  .dd-input:checked + .dd-menu {
    display: block;
  } 
  
  .dd-menu li {
    padding: 10px 20px;
    cursor: pointer;
    white-space: nowrap;
  }
  
  .dd-menu li:hover {
    background-color: #f6f6f6;
  }
  
  .dd-menu li a {
    display: block;
    margin: -10px -20px;
    padding: 10px 20px;
  }
  
  .dd-menu li.divider{
    padding: 0;
    border-bottom: 1px solid #cccccc;
  } 
  */



/*<label class="dropdown">

  <div class="dd-button">
    Dropdown
  </div>

  <input type="checkbox" class="dd-input" id="test">

  <ul class="dd-menu">
    <li>Action</li>
    <li>Another action</li>
    <li>Something else here</li>
    <li class="divider"></li>
    <li>
      <a href="http://rane.io">Link to Rane.io</a>
    </li>
  </ul>
  
</label>*/