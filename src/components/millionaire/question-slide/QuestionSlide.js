import {Card, Typography, Grid  } from "@material-ui/core";
import {useState, useEffect} from "react";
import { shuffle } from 'lodash';
import './QuestionSlide.css'


function QuestionSlide (props) {
  const { questionObj, onStatusChanged, index:slideIndex } = props;
  const [ questionObjDecoded, setQuestionObjDecoded ] = useState({ answers: [] })
  const [ answered, setAnswered ] = useState(false)

  const fromBinary = encoded => {
    // returning just atob(encoded) is not UTF-8 safe;
    return  decodeURIComponent(atob(encoded).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  };

  useEffect(() => {
    const answers = shuffle([
      ...questionObj.incorrect_answers.map( answer => ({ answer: fromBinary(answer), correct: false})),
      { answer: fromBinary(questionObj.correct_answer), correct: true },
    ]);
    setQuestionObjDecoded( {
      category: fromBinary(questionObj.category),
      type: fromBinary(questionObj.type),
      difficulty: fromBinary(questionObj.difficulty),
      question: fromBinary(questionObj.question),
      correctAnswer: fromBinary(questionObj.correct_answer),
      incorrectAnswers: questionObj.incorrect_answers.map( answer => fromBinary(answer)),
      answers,
    });
  }, [props.questionObj]);

  const handleCardClick = (answer, index) => {
    if (answered)
      return;
    const answers = [ ...questionObjDecoded.answers ];
    answers[index].clicked = true;
    setQuestionObjDecoded({...questionObjDecoded, answers })
    onStatusChanged({answered: true, correct: answer.correct}, slideIndex)
    setAnswered(true);
  }
  const handleCardMouseDown = (answer, index) => {
    if (answered)
      return;
    const answers = [ ...questionObjDecoded.answers ];
    answers[index].mouseDown = true;
    setQuestionObjDecoded({...questionObjDecoded, answers })
  }
  const handleCardMouseUp = (answer, index) => {
    if (answered)
      return;
    const answers = [ ...questionObjDecoded.answers ];
    answers[index].mouseDown = false;
    setQuestionObjDecoded({...questionObjDecoded, answers })
  }

  const { category = '', question = '', answers = [] } = questionObjDecoded;
  return (

    <Grid  className={'main-question-container'}>
      <Typography className="category" variant="h6">
        {category}
      </Typography>
      <Typography className="question" variant="h4">
        {question}
      </Typography>
      <Grid container className='answers' spacing={2}>

        {
          answers.map((answer, index ) => {

           const clicked = answer.clicked ? ' clicked' : ''
           const correct = answer.correct ? ' correct' : ''
           const isAnswered = answered ? ' answered' : ''
           return (<Grid item xs={12} sm={6}  key={index}>
              <Card
                raised={!answer.mouseDown}
                onClick={() => handleCardClick(answer, index)}
                onMouseDown={()=> handleCardMouseDown(answer, index)}
                onMouseUp={()=> handleCardMouseUp(answer, index)}
                className={'answer-card' + clicked + correct + isAnswered}>
                <Typography className="question" variant="h5">
                  {answer.answer}
                </Typography>
              </Card>
            </Grid>
          )})
        }

      </Grid>
    </Grid>

  );
}

export default QuestionSlide;
