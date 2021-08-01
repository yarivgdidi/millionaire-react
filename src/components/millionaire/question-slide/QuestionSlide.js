import {Card, Typography, Grid  } from "@material-ui/core";
import {useState, useEffect} from "react";
import { shuffle } from 'lodash';
import './QuestionSlide.css'


function QuestionSlide (props) {
  const { questionObj } = props;
  const [ questionObjDecoded, setQuestionObjDecoded ] = useState({ answers: [] })

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

        {answers.map(answer=>
          <Grid item xs={12} sm={6}>
            <Card className={'answer-card'}>
              <Typography className="question" variant="h5">
                {answer.answer}
              </Typography>
            </Card>
          </Grid>
            )}
      </Grid>


      <p className="legend">Legend 1</p>
    </Grid>

  );
}

export default QuestionSlide;
