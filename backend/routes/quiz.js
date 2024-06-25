const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Quiz = require("../models/Quiz");
const { body, validationResult } = require("express-validator");

// ROUTE 1 : Get All the QUIZ using : GET "/api/quiz/getuser" .Login required
router.get("/fetchallquiz", fetchuser, async (req, res) => {
    try {
      const quizs = await Quiz.find({ user: req.user.id });
      res.json(quizs);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

  // ROUTE: Fetch all the JSON for quiz collection
  router.get("/fetchallquiznoauthentication/:message", async (req, res) => {
    try {
      const quizs = await Quiz.find({ code: req.params.message});
      res.json(quizs);

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });



// ROUTE 2 : Add a new quiz using : POST "/api/quizs/addquiz" .Login required
router.post(
  "/addquiz",
  fetchuser,
  [
    body("question", "Enter the question properly").isLength({ min: 5 }),
    body("option1", "option1 must atleast 3 characters").isLength({ min: 3 }),
    body("option2", "option1 must atleast 3 characters").isLength({ min: 3 }),
    body("option3", "option1 must atleast 3 characters").isLength({ min: 3 }),
    body("option4", "option1 must atleast 3 characters").isLength({ min: 3 }),
    body("answer", "answer must atleast 3 characters").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { question, option1, option2, option3, option4, answer, title, mcq, code } = req.body;

      // If there are errors, return bad req and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const quiz = new Quiz({
        question,
        option1,
        option2,
        option3,
        option4,
        answer,
        title,
        mcq,
        code,
        user: req.user.id,
      });
      const savedQuiz = await quiz.save();

      // to send the saved quiz in the response
      res.json(savedQuiz);
      console.log(req.user.id)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3 : Update an existing quiz using : PUT "/api/quiz/updatequiz/:id" .Login required
router.put("/updatequiz/:id", fetchuser, async (req, res) => {
  const { question, option1, option2, option3, option4, answer, title, mcq, code } = req.body;
  //Create a new quiz object
  const newQuiz = {};
  if (question) {
    newQuiz.question = question;
  }
  if (option1) {
    newQuiz.option1 = option1;
  }
  if (option2) {
    newQuiz.option2 = option2;
  }
  if (option3) {
    newQuiz.option3 = option3;
  }
  if (option4) {
    newQuiz.option4 = option4;
  }
  if (answer) {
    newQuiz.answer = answer;
  }
  if (title) {
    newQuiz.title = title;
  }
  if (mcq) {
    newQuiz.mcq = mcq;
  }
  if (code) {
    newQuiz.code = code;
  }

  console.log(req.params.id);
  //Find the quiz to be updated and update it
  try {
    var quiz = await Quiz.findById(req.params.id);
    console.log(quiz);
    if (!quiz) {
      res.status(404).send("Not Found");
    }
    if (quiz.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { $set: newQuiz },
      { new: true }
    );
    res.json({ quiz });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});








// ROUTE 3 : Update an existing quiz using : PUT "/api/quiz/updatequiz/:id" .Login required
router.put("/updatecode/:id", fetchuser, async (req, res) => {
  const { code } = req.body;
  //Create a new quiz object
  const newQuiz = {};
  if (code) {
    newQuiz.code = code;
  }
  
  const numberHAI = (req.params.id)
    console.log(numberHAI, typeof numberHAI)
  // console.log(req.params.id);
  //Find the quiz to be updated and update it
  try {
    var quiz = await Quiz.find({"user": numberHAI});
    // console.log(quiz);
    
    if (!quiz) {
      res.status(404).send("Not Found");
    }
    // if (quiz.user.toString() !== req.user.id) {
    //   return res.status(401).send("Not Allowed");
    // }
    
    quiz = await Quiz.updateMany(
      {"user": numberHAI},
      { $set: newQuiz },
      { new: true }
    );
    res.json({ quiz });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});









// ROUTE 4 : Delete an existing quiz using : DELETE "/api/quizs/deletequiz/:id" .Login required
router.delete("/deletequiz/:id", fetchuser, async (req, res) => {
  //Find the quiz to be deleted and delete it
  try {
    let quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      res.status(404).send("Not Found");
    }
    //Allow deletion only if userr owns this quiz
    if (quiz.user.toString() !== req.user.id) {
      //if not authenticated user
      return res.status(401).send("Not Allowed");
    }
    quiz = await Quiz.findByIdAndDelete(req.params.id);
    res.json({ Success: "Quiz has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
