import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import QuizState from "./context/quizs/QuizState";
import About from "./components/About";
import Alert from "./components/Alert";
import Login from "./components/Login";
import PlayQuizEntry from "./components/PlayQuizEntry";
import Signup from "./components/Signup";
import{ useState } from 'react';

function App() {
  const[alert, setAlert] = useState(null);
  const showAlert =(message,type)=> { //to show alert messages
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() =>{
      setAlert(null)
    },1500)
  }
  return (
    <>
      <QuizState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/playquiz" element={<PlayQuizEntry />} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />


            </Routes>
          </div>
        </BrowserRouter>
      </QuizState>
    </>
  );
}

export default App;
