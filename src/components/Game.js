import { useState } from "react";
import React from "react";
import "./Game.css";
const Game = (props) => {
const { quiz } = props;
var [value, setValue] = useState("")
// var [score, setScore] = useState(0)
var score=0;
window.val = 0;
var flag=0;

const addScore = () => {
    if(value == quiz.answer && flag == 0 ){
       score=1 
        window.val = window.val + score;
        flag = 1;
    }
    else if(flag==1 && value != quiz.answer){
        window.val = window.val - 1;
        flag=0;
    }
    else{
       score=0
    }
    console.log(score, typeof score);
    console.log(window.val);

    sessionStorage.setItem("val", window.val);
}



// sessionStorage.setItem(window.val);
  return (
    <div>
    <form method="GET">
      <div className="col gx-1">
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{quiz.question}</h5>
            <div className="row gx-2">
              <div className="col">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={quiz.option1}
                    name={quiz.question}
                    value= {quiz.option1}
                    onClick={()=> {value=quiz.option1; console.log(value); addScore();}}
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    {quiz.option1}
                  </label>
                </div>
              </div>
              <div className="col">
              <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={quiz.option2}
                    name={quiz.question}
                    value= {quiz.option2}
                    onClick={()=> {value=quiz.option2; console.log(value); addScore();}}
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    {quiz.option2}
                  </label>
                </div>
              </div>
              <div className="col">
              <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={quiz.option3}
                    name={quiz.question}
                    value= {quiz.option3}
                    onClick={()=> {value=quiz.option3; console.log(value); addScore();}}
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    {quiz.option3}
                  </label>
                </div>
              </div>
              <div className="col">
              <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id={quiz.option4}
                    name={quiz.question}
                    value= {quiz.option4}
                    onClick={()=> {value=quiz.option4; console.log(value); addScore();}}
                  />
                  <label className="form-check-label" for="flexRadioDefault2">
                    {quiz.option4}
                  </label>
                </div>
              </div>
            </div>
            <div className="row my-1">
              <div className="col">Is the question type MCQ : {quiz.mcq}</div>
            </div>
            <div className="row my-1">
              <div className="col">Title : {quiz.title}</div>
            </div>
          </div>
        </div>
      </div>
      {/* <button type="submit">submit</button> */}
      
      </form>
    </div>
  );
};

export default Game;
