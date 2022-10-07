import "./App.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState, useRef, useEffect } from "react";
import { Chip, Grid } from "@mui/material";

function App() {
  const [questions, setQuestions] = useState([
    {
      question: "Html Stands For _______________________",
      options: [
        "Hyper Text Makeup Language",
        "html",
        "Case Cading Style Sheet",
        "Hypertext markup language",
      ],
      correctAns: "Hypertext markup language",
    },
    {
      question: "Css Stands For _______________________",
      options: [
        "Casecading Style Sheet",
        "Java",
        "Ram",
        "Hypertext markup language",
      ],
      correctAns: "Casecading Style Sheet",
    },
    {
      question: "Js Stands For _______________________",
      options: ["Java Style", "Java Script", "Script", "Script Src"],
      correctAns: "Java Script",
    },
    {
      question: "Dom Stands For _______________________",
      options: ["Document Object Model", "html", "Css", "Java"],
      correctAns: "Document Object Model",
    },
    {
      question: "Ram Stands For _______________________",
      options: ["Read Only Memory", "Dom", "Random Acccess Memory", "For Pc"],
      correctAns: "Random Acccess Memory",
    },
    {
      question: "Rom Stands For _______________________",
      options: [
        "Hyper Text Markup Language",
        "html",
        "HTml",
        "Read Only Memory",
      ],
      correctAns: "Read Only Memory",
    },
  ]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState("00:00:00");
  const Ref = useRef(null);
  const [sec, setSec] = useState(0);
  const [finalTimeTaken, setFinalTimeTaken] = useState(0);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);

    setSec(seconds);

    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }

    if ((seconds == 0) & (hours == 0) & (minutes == 0)) {
      console.log("0");
      setShowResult(true);
    }
  };

  const clearTimer = (e) => {
    setTimer("00:00:10");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  let checkQuestion = (a, b) => {
    if (a == b) {
      setScore(score + 1);
    }

    if (index + 1 == questions.length) {
      setFinalTimeTaken(sec);
      setShowResult(true);
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <>
      <div className="App">
        {showResult ? (
          <>
            {finalTimeTaken <= 0 ? <h1>Time UP!</h1> : null}
            <h1>Your Score is {score}</h1>
            <h1>Time Taken: {10 - finalTimeTaken}s</h1>
          </>
        ) : (
          <>
            <Box>
              <Typography variant="h2" gutterBottom align="center">
                Question # {index + 1} / {questions.length}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4">{questions[index].question}</Typography>
            </Box>
            <Box sx={{ margin: 5 }}>
              <Grid rowSpacing={2} container>
                {questions[index].options.map((x, i) => (
                  <Grid key={i} item md={6}>
                    <Chip
                      color="primary"
                      label={x}
                      onClick={() =>
                        checkQuestion(x, questions[index].correctAns)
                      }
                    ></Chip>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Typography variant="h4">Time Remaining: {timer}</Typography>
          </>
        )}
      </div>
    </>
  );
}

export default App;
