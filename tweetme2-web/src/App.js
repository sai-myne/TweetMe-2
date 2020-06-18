import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

const loadTweets = function(callback){
  const xhr = new XMLHttpRequest() // xhr = someClass()
  const method = 'GET' // 'POST'
  const url = 'http://localhost:8000/api/tweets/'
  const responseType = 'json'
  xhr.responseType = responseType
  xhr.open(method, url)
  xhr.onload = function () {
      callback(xhr.response, xhr.status)  
  }
  xhr.onerror = function(e){
    console.log(e)
    callback({"message": "The request was an error"}, 400)
  }
  xhr.send()
}

function Tweet(props) {
  const {tweet} = props
  const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
  return <div className={className}>
    <p>{tweet.id} - {tweet.content}</p>
  </div>
}

function App() {
  const [tweets, setTweets] = useState([])
  
  useEffect(() => {
    const myCallback = (response, status) => {
      console.log(response, status)
      if(status === 200)
        setTweets(response)
      else {
        alert("There was an error")
      } 
    }
    loadTweets(myCallback)
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {tweets.map((item, index) => {
            return <Tweet tweet={item} key={`${index}-{item.id}`} className='my-5 py-5 border bg-white text-dark'/>
          })}
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
