import './App.css';

function App() {
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

          <button className='openGroup'>Open Group</button>
        </div>
      </div>
      <nav className='links-list'>
          <div className='input_button_group'><button className='addLink'>+</button><input></input></div>
          <ul className="lul">
            <li>https://scrapy.org/<button>test</button></li>
            <li>https://docs.bokeh.org/en/latest/docs/gallery/candlestick.html<button>test</button></li>
            <li><div>https://medium.com/techie-delight/top-25-algorithms-every-programmer-should-know-373246b4881b</div><button>test</button></li>
            <li>https://www.youtube.com/watch?v=Wa7IzKdg01c<button>test</button></li>
            <li>https://machinelearningmastery.com/machine-learning-in-python-step-by-step/<button>test</button></li>
            <li>https://docs.djangoproject.com/en/4.0/intro/tutorial01/<button>test</button></li>
            <li>https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world<button>test</button></li>
            <li>https://flask.palletsprojects.com/en/2.0.x/tutorial/<button>test</button></li>
          </ul>
        
          <div>delete group</div>
        </nav>

    </div>
  );
}

export default App;
