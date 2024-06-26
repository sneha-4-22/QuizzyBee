import React, { useState } from 'react';
import { json } from 'react-router-dom';
import Game from './Game';
import "./PlayQuizEntry.css"

const PlayQuizEntry = () => {

  const [message, setMessage] = useState('');
  const [seq, setSeq] = useState("")  
  const quizsInitial = []
  const [quizs, setQuizs] = useState(quizsInitial)

  var [val, setVal] = useState('')


  // var TEST = localStorage.getItem("val");

  // var windowsvariable = sessionStorage.getItem(window.val);



  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    // 👇 "message" stores input field value
    // setUpdated(message);
  };

  const fetchallquiz = async() => {
    const response = await fetch(`http://localhost:1000/api/quiz/fetchallquiznoauthentication/${message}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json() 
    console.log(json, "FETCH");
    setSeq('1')
    setQuizs(json)
    // localStorage.setItem("val", 0);
    const disableBtn=()=> {
      document.getElementById('btn2').disabled = true;
    }
    disableBtn();
  }

  console.log(seq);

  const myFunction = () =>{
    console.log(sessionStorage.getItem("val"))
    setVal(sessionStorage.getItem("val"))
    const disableBtn=()=> {
      document.getElementById('btn').disabled = true;
    }
    disableBtn();
  }


  return (
    <div className="play-quiz-container">
      <h2 className="play-quiz-title">Play Quiz</h2>
      <div>
        <input
          type="text"
          id="message"
          name="message"
          onChange={handleChange}
          value={message}
          className="quiz-code-input"
          placeholder="Enter quiz code"
        />
        <h2 className="message-display">Quiz Code: {message}</h2>
        <button className='btn btn-primary' id="btn2" onClick={fetchallquiz}>Play</button>
      </div>

      <div className="game-list">
        {quizs.map((quiz) => (
          <Game quiz={quiz} key={quiz._id} />
        ))}
      </div>

      <div className="score-section">
        <button className={seq === '1' ? 'btn btn-primary' : 'd-none'} id="btn" onClick={myFunction}>
          Generate Score
        </button>
        <div className={seq === '1' ? 'score-display' : 'd-none'}>
          Your Score is: {val}
        </div>
      </div>

      <div>
    <a href="http://localhost:8000/playquiz" class="btn btn-danger my-2" tabIndex="-1" role="button">RESET</a>
    </div>
    </div>
  )
}

export default PlayQuizEntry;
