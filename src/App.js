import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h3>Tab Organizer</h3>
      </div>
      <body>
        <div className='group-list'>
          <ul>
            <li>py</li>
            <li>crypto</li>
            <li>react</li>
            <li>jobs</li>
            <li>unreal</li>
          </ul>
        </div>

        <div className='header-list'>
          <div>
            <div>
              <h3>py links</h3>
              <button>+ reopen in new window</button>
            </div>
            <p>group notes: python nn project tutorials and useful tools</p>
            <p>maybe have an option 'todo list' associated with the links as well think sigmaos</p>
          </div>
          <nav>
            <ul className='links-list'>
              <li>https://scrapy.org/</li>
              <li>https://docs.bokeh.org/en/latest/docs/gallery/candlestick.html</li>
              <li>https://medium.com/techie-delight/top-25-algorithms-every-programmer-should-know-373246b4881b</li>
              <li>https://www.youtube.com/watch?v=Wa7IzKdg01c</li>
              <li>https://machinelearningmastery.com/machine-learning-in-python-step-by-step/</li>
              <li>https://docs.djangoproject.com/en/4.0/intro/tutorial01/</li>
              <li>https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world</li>
              <li>https://flask.palletsprojects.com/en/2.0.x/tutorial/</li>
            </ul>
          </nav>
        </div>
      </body>
    </div>
  );
}

export default App;
