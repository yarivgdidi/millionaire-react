import {Card} from "@material-ui/core";
import {useState, useEffect} from "react";
import { shuffle } from 'lodash';
function QuestionSlide (props) {
  const { questionObj } = props;
  const { questionObjDecoded, setQuestionObjDecoded } = useState({ answers: [] })

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



  return (

    <div>
      <Card className={'main-card'}>
        Category: {}
      </Card>

      <p className="legend">Legend 1</p>
    </div>

  );
}

export default QuestionSlide;
